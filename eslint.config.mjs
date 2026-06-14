import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Materiały referencyjne / robocze (nie kod aplikacji).
    "docs/**",
    "temp/**",
    // Wgrane demo suminagashi (tło) — biblioteka, nie kod aplikacji.
    "public/suminagashi/**",
  ]),
]);

export default eslintConfig;
