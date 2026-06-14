"use client";

import { useRef, useEffect, useState } from "react";
import { Renderer, Program, Triangle, Mesh } from "ogl";

// Animowane tło „suminagashi" — domain-warped fbm (rozlewający się tusz) na ogl.
// Jeden fullscreen fragment shader (tani, bez wielopassowego fluid solvera).
// Light/dark przez uniform, pauza poza widokiem/karta nieaktywna, reduced-motion = statyczna klatka.

const vert = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const frag = `precision highp float;
varying vec2 vUv;

uniform float uTime;
uniform vec2  uResolution;
uniform float uDark;        // 0 = light, 1 = dark
uniform vec3  uPaper;
uniform vec3  uInk1;        // granat
uniform vec3  uInk2;        // czerwień
uniform vec3  uInk3;        // zieleń

// value noise + fbm
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1.0,0.0)), u.x),
             mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0; float a = 0.5;
  for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = vUv;
  uv.x *= uResolution.x / uResolution.y;
  float t = uTime * 0.04;

  // domain warping — atramentowe smugi
  vec2 q = vec2(fbm(uv*1.4 + vec2(0.0, t)), fbm(uv*1.4 + vec2(5.2, -t)));
  vec2 r = vec2(fbm(uv*1.4 + 3.0*q + vec2(1.7, 9.2) + t*0.5),
                fbm(uv*1.4 + 3.0*q + vec2(8.3, 2.8) - t*0.5));
  float f = fbm(uv*1.4 + 3.5*r);

  // warstwy tuszu — różne progi mieszania
  vec3 col = uPaper;
  float ink1 = smoothstep(0.55, 0.85, f + 0.15*r.x);
  float ink2 = smoothstep(0.62, 0.92, length(r));
  float ink3 = smoothstep(0.50, 0.80, f*q.y + 0.2);

  // intensywność tuszu — w light delikatny, w dark mocniejszy jako poświata
  float strength = mix(0.22, 0.42, uDark);
  col = mix(col, uInk1, ink1 * strength);
  col = mix(col, uInk2, ink2 * strength * 0.85);
  col = mix(col, uInk3, ink3 * strength * 0.6);

  // ziarno papieru
  float grain = (hash(vUv * uResolution.xy * 0.5) - 0.5) * 0.025;
  col += grain;

  gl_FragColor = vec4(col, 1.0);
}`;

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return m ? [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255] : [1, 1, 1];
};

const PAPER_LIGHT = "#efeae0";
const PAPER_DARK = "#14131a";
const INK_NAVY = "#16407a";
const INK_RED = "#c8372d";
const INK_GREEN = "#2e6e52";

const readReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

    const renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 1.5), alpha: false });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: [1, 1] as [number, number] },
      uDark: { value: isDark() ? 1 : 0 },
      uPaper: { value: hexToRgb(isDark() ? PAPER_DARK : PAPER_LIGHT) },
      uInk1: { value: hexToRgb(INK_NAVY) },
      uInk2: { value: hexToRgb(INK_RED) },
      uInk3: { value: hexToRgb(INK_GREEN) },
    };

    const mesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program: new Program(gl, { vertex: vert, fragment: frag, uniforms }),
    });

    const resize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    };
    window.addEventListener("resize", resize);
    resize();

    // reaguj na zmianę motywu (ThemeSwitcher zmienia data-theme)
    const themeObserver = new MutationObserver(() => {
      uniforms.uDark.value = isDark() ? 1 : 0;
      uniforms.uPaper.value = hexToRgb(isDark() ? PAPER_DARK : PAPER_LIGHT);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0 });
    io.observe(container);

    const renderStatic = () => renderer.render({ scene: mesh });

    const loop = (tMs: number) => {
      if (visible && document.visibilityState === "visible") {
        uniforms.uTime.value = tMs * 0.001;
        renderer.render({ scene: mesh });
      }
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      renderStatic();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
