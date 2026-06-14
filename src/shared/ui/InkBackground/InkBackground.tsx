"use client";

import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh, RenderTarget, type OGLRenderingContext } from "ogl";

// Tło „suminagashi" — prawdziwa symulacja płynów (Stam / Navier-Stokes) na ogl.
// advection -> divergence -> pressure (Jacobi) -> gradient subtract -> splat dye, ping-pong FBO.
// Mysz/dotyk dodaje splat (velocity + dye), auto-splaty utrzymują tusz przy życiu, kolory z palety atramentów.
// data-theme steruje kolorem papieru, reduced-motion = kilka statycznych splatów bez pętli.

const SIM_RES = 192;
const DYE_RES = 384;
const PRESSURE_ITERATIONS = 20;
const DENSITY_DISSIPATION = 0.985;
const VELOCITY_DISSIPATION = 0.985;
const SPLAT_RADIUS = 0.004;
const AUTO_SPLAT_INTERVAL = 1.8;

const baseVert = `
attribute vec2 position;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform vec2 uTexel;
void main() {
  vUv = position * 0.5 + 0.5;
  vL = vUv - vec2(uTexel.x, 0.0);
  vR = vUv + vec2(uTexel.x, 0.0);
  vT = vUv + vec2(0.0, uTexel.y);
  vB = vUv - vec2(0.0, uTexel.y);
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const clearFrag = `precision highp float;
varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uValue;
void main() {
  gl_FragColor = uValue * texture2D(uTexture, vUv);
}`;

const splatFrag = `precision highp float;
varying vec2 vUv;
uniform sampler2D uTarget;
uniform float uAspect;
uniform vec3 uColor;
uniform vec2 uPoint;
uniform float uRadius;
void main() {
  vec2 p = vUv - uPoint;
  p.x *= uAspect;
  vec3 splat = exp(-dot(p, p) / uRadius) * uColor;
  vec3 base = texture2D(uTarget, vUv).xyz;
  gl_FragColor = vec4(base + splat, 1.0);
}`;

const advectionFrag = `precision highp float;
varying vec2 vUv;
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 uTexel;
uniform float uDt;
uniform float uDissipation;
void main() {
  vec2 coord = vUv - uDt * texture2D(uVelocity, vUv).xy * uTexel;
  gl_FragColor = uDissipation * texture2D(uSource, coord);
}`;

const divergenceFrag = `precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uVelocity;
void main() {
  float L = texture2D(uVelocity, vL).x;
  float R = texture2D(uVelocity, vR).x;
  float T = texture2D(uVelocity, vT).y;
  float B = texture2D(uVelocity, vB).y;
  float div = 0.5 * (R - L + T - B);
  gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
}`;

const pressureFrag = `precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main() {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  float div = texture2D(uDivergence, vUv).x;
  float pressure = (L + R + B + T - div) * 0.25;
  gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
}`;

const gradientSubtractFrag = `precision highp float;
varying vec2 vUv;
varying vec2 vL;
varying vec2 vR;
varying vec2 vT;
varying vec2 vB;
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main() {
  float L = texture2D(uPressure, vL).x;
  float R = texture2D(uPressure, vR).x;
  float T = texture2D(uPressure, vT).x;
  float B = texture2D(uPressure, vB).x;
  vec2 velocity = texture2D(uVelocity, vUv).xy;
  velocity.xy -= vec2(R - L, T - B) * 0.5;
  gl_FragColor = vec4(velocity, 0.0, 1.0);
}`;

const displayFrag = `precision highp float;
varying vec2 vUv;
uniform sampler2D uDye;
uniform vec3 uPaper;
uniform float uDark;
void main() {
  vec3 ink = texture2D(uDye, vUv).rgb;
  float amount = clamp(length(ink), 0.0, 1.0);
  float strength = mix(0.9, 1.0, uDark);
  vec3 col = mix(uPaper, ink, clamp(amount * strength, 0.0, 1.0));
  float grain = (fract(sin(dot(vUv, vec2(127.1, 311.7))) * 43758.5453) - 0.5) * 0.02;
  gl_FragColor = vec4(col + grain, 1.0);
}`;

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const PAPER_LIGHT = "#efeae0";
const PAPER_DARK = "#14131a";
const INK_COLORS: ReadonlyArray<[number, number, number]> = [
  hexToRgb("#16407a"), // ai — granat
  hexToRgb("#c8372d"), // shu — czerwień
  hexToRgb("#2e6e52"), // matsuba — zieleń
  hexToRgb("#1a1a1f"), // sumi — czerń
];

const readReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type FBO = { read: RenderTarget; write: RenderTarget; swap: () => void };

const createFBO = (
  gl: OGLRenderingContext,
  size: number,
  type: number,
): FBO => {
  const opts = {
    width: size,
    height: size,
    type,
    format: gl.RGBA,
    internalFormat: (gl as WebGL2RenderingContext).RGBA16F ?? gl.RGBA,
    minFilter: gl.LINEAR,
    magFilter: gl.LINEAR,
    depth: false,
  };
  const fbo: FBO = {
    read: new RenderTarget(gl, opts),
    write: new RenderTarget(gl, opts),
    swap() {
      const t = this.read;
      this.read = this.write;
      this.write = t;
    },
  };
  return fbo;
};

export const InkBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = useState(readReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1.5),
      alpha: false,
      antialias: false,
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    // float / half-float textures wymagane do symulacji
    const isWebGL2 = "RGBA16F" in gl;
    let texType = gl.UNSIGNED_BYTE as number;
    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
      texType = (gl as WebGL2RenderingContext).HALF_FLOAT;
    } else {
      const ext = gl.getExtension("OES_texture_half_float");
      gl.getExtension("OES_texture_half_float_linear");
      if (ext) texType = ext.HALF_FLOAT_OES;
    }

    const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";

    const velocity = createFBO(gl, SIM_RES, texType);
    const dye = createFBO(gl, DYE_RES, texType);
    const divergence = new RenderTarget(gl, {
      width: SIM_RES, height: SIM_RES, type: texType, format: gl.RGBA,
      internalFormat: (gl as WebGL2RenderingContext).RGBA16F ?? gl.RGBA,
      minFilter: gl.NEAREST, magFilter: gl.NEAREST, depth: false,
    });
    const pressure = createFBO(gl, SIM_RES, texType);

    const triangle = new Triangle(gl);
    const simTexel: [number, number] = [1 / SIM_RES, 1 / SIM_RES];

    const makeMesh = (fragment: string, uniforms: Record<string, { value: unknown }>) =>
      new Mesh(gl, {
        geometry: triangle,
        program: new Program(gl, { vertex: baseVert, fragment, uniforms, depthTest: false, depthWrite: false }),
      });

    const clearMesh = makeMesh(clearFrag, {
      uTexel: { value: simTexel },
      uTexture: { value: pressure.read.texture },
      uValue: { value: 0.8 },
    });
    const splatMesh = makeMesh(splatFrag, {
      uTexel: { value: simTexel },
      uTarget: { value: velocity.read.texture },
      uAspect: { value: 1 },
      uColor: { value: [0, 0, 0] },
      uPoint: { value: [0.5, 0.5] },
      uRadius: { value: SPLAT_RADIUS },
    });
    const advectionMesh = makeMesh(advectionFrag, {
      uTexel: { value: simTexel },
      uVelocity: { value: velocity.read.texture },
      uSource: { value: velocity.read.texture },
      uDt: { value: 0.016 },
      uDissipation: { value: VELOCITY_DISSIPATION },
    });
    const divergenceMesh = makeMesh(divergenceFrag, {
      uTexel: { value: simTexel },
      uVelocity: { value: velocity.read.texture },
    });
    const pressureMesh = makeMesh(pressureFrag, {
      uTexel: { value: simTexel },
      uPressure: { value: pressure.read.texture },
      uDivergence: { value: divergence.texture },
    });
    const gradientMesh = makeMesh(gradientSubtractFrag, {
      uTexel: { value: simTexel },
      uPressure: { value: pressure.read.texture },
      uVelocity: { value: velocity.read.texture },
    });
    const displayMesh = makeMesh(displayFrag, {
      uTexel: { value: simTexel },
      uDye: { value: dye.read.texture },
      uPaper: { value: hexToRgb(isDark() ? PAPER_DARK : PAPER_LIGHT) },
      uDark: { value: isDark() ? 1 : 0 },
    });

    const aspect = () => container.clientWidth / Math.max(container.clientHeight, 1);

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", resize);
    resize();

    const splat = (x: number, y: number, dx: number, dy: number, color: [number, number, number]) => {
      const a = aspect();
      const radius = SPLAT_RADIUS * (a > 1 ? a : 1);

      splatMesh.program.uniforms.uAspect.value = a;
      splatMesh.program.uniforms.uPoint.value = [x, y];
      splatMesh.program.uniforms.uRadius.value = radius;

      splatMesh.program.uniforms.uTarget.value = velocity.read.texture;
      splatMesh.program.uniforms.uColor.value = [dx, dy, 0];
      renderer.render({ scene: splatMesh, target: velocity.write });
      velocity.swap();

      splatMesh.program.uniforms.uTarget.value = dye.read.texture;
      splatMesh.program.uniforms.uColor.value = color;
      renderer.render({ scene: splatMesh, target: dye.write });
      dye.swap();
    };

    const randomColor = () => INK_COLORS[(Math.random() * INK_COLORS.length) | 0];
    const autoSplat = () => {
      const x = 0.15 + Math.random() * 0.7;
      const y = 0.15 + Math.random() * 0.7;
      const angle = Math.random() * Math.PI * 2;
      const force = 1000 + Math.random() * 1500;
      splat(x, y, Math.cos(angle) * force, Math.sin(angle) * force, randomColor());
    };

    // reduced-motion: kilka statycznych plam, jedna klatka, koniec
    if (reduced) {
      for (let i = 0; i < 5; i++) autoSplat();
      displayMesh.program.uniforms.uDye.value = dye.read.texture;
      renderer.render({ scene: displayMesh });

      window.removeEventListener("resize", resize);
      return () => {
        const ext = gl.getExtension("WEBGL_lose_context");
        if (ext) ext.loseContext();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      };
    }

    // wskaźnik (mysz / dotyk)
    const pointer = { x: 0.5, y: 0.5, dx: 0, dy: 0, moved: false, color: randomColor() };
    let recolorTimer = 0;
    const onMove = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = 1 - (clientY - rect.top) / rect.height;
      pointer.dx = (x - pointer.x) * 5500;
      pointer.dy = (y - pointer.y) * 5500;
      pointer.x = x;
      pointer.y = y;
      pointer.moved = true;
      recolorTimer += 1;
      if (recolorTimer > 40) {
        pointer.color = randomColor();
        recolorTimer = 0;
      }
    };
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onMove(t.clientX, t.clientY);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const themeObserver = new MutationObserver(() => {
      displayMesh.program.uniforms.uPaper.value = hexToRgb(isDark() ? PAPER_DARK : PAPER_LIGHT);
      displayMesh.program.uniforms.uDark.value = isDark() ? 1 : 0;
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let visible = true;
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 });
    io.observe(container);

    // start: kilka splatów, żeby tusz żył od razu
    for (let i = 0; i < 4; i++) autoSplat();

    let raf = 0;
    let last = performance.now();
    let autoTimer = 0;

    const step = (dt: number) => {
      // 1. advect velocity
      advectionMesh.program.uniforms.uVelocity.value = velocity.read.texture;
      advectionMesh.program.uniforms.uSource.value = velocity.read.texture;
      advectionMesh.program.uniforms.uDt.value = dt;
      advectionMesh.program.uniforms.uDissipation.value = VELOCITY_DISSIPATION;
      renderer.render({ scene: advectionMesh, target: velocity.write });
      velocity.swap();

      // 2. advect dye
      advectionMesh.program.uniforms.uVelocity.value = velocity.read.texture;
      advectionMesh.program.uniforms.uSource.value = dye.read.texture;
      advectionMesh.program.uniforms.uDissipation.value = DENSITY_DISSIPATION;
      renderer.render({ scene: advectionMesh, target: dye.write });
      dye.swap();

      // pointer splat
      if (pointer.moved) {
        splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color);
        pointer.dx = 0;
        pointer.dy = 0;
        pointer.moved = false;
      }

      // 3. divergence
      divergenceMesh.program.uniforms.uVelocity.value = velocity.read.texture;
      renderer.render({ scene: divergenceMesh, target: divergence });

      // 4. clear pressure (decay)
      clearMesh.program.uniforms.uTexture.value = pressure.read.texture;
      clearMesh.program.uniforms.uValue.value = 0.8;
      renderer.render({ scene: clearMesh, target: pressure.write });
      pressure.swap();

      // 5. pressure solve (Jacobi)
      pressureMesh.program.uniforms.uDivergence.value = divergence.texture;
      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        pressureMesh.program.uniforms.uPressure.value = pressure.read.texture;
        renderer.render({ scene: pressureMesh, target: pressure.write });
        pressure.swap();
      }

      // 6. gradient subtract
      gradientMesh.program.uniforms.uPressure.value = pressure.read.texture;
      gradientMesh.program.uniforms.uVelocity.value = velocity.read.texture;
      renderer.render({ scene: gradientMesh, target: velocity.write });
      velocity.swap();
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const elapsed = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!visible || document.hidden) return;

      autoTimer += elapsed;
      if (autoTimer >= AUTO_SPLAT_INTERVAL) {
        autoSplat();
        autoTimer = 0;
      }

      step(elapsed * 60);

      displayMesh.program.uniforms.uDye.value = dye.read.texture;
      renderer.render({ scene: displayMesh });
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      io.disconnect();
      themeObserver.disconnect();
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [reduced]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
};
