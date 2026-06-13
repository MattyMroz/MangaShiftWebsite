#!/usr/bin/env node
// Claude Code status line — bold, MangaShift palette (strong white + ruby red).
// Layout:  model | bar % | tokens used/total | cost | time | branch
// Reads session JSON from stdin, prints a single line to stdout.

import { execSync } from "node:child_process";

// ── Read stdin ──
let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) raw += chunk;

let data = {};
try {
  data = JSON.parse(raw || "{}");
} catch {
  data = {};
}

// ── Palette (rich_console) — everything bold, no gray ──
const rgb = (r, g, b) => `\x1b[38;2;${r};${g};${b}m`;
const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const W = `${BOLD}${rgb(255, 255, 255)}`; // strong white, bold
const ACCENT = [215, 119, 87]; // <-- zmieniaj tu: pomarańczowy
const R = `${BOLD}${rgb(...ACCENT)}`; // accent, bold
const G = `${BOLD}${rgb(58, 58, 58)}`; // gray, bold (secondary)
const SEP = `${G}|${RESET}`;

// ── Fields ──
const rawModel = data?.model?.display_name ?? "Unknown";
// Strip trailing "(... context ...)" suffix, e.g. "Opus 4.8 (1M context)" -> "Opus 4.8"
const model = rawModel.replace(/\s*\([^)]*context[^)]*\)\s*$/i, "").trim();
const usedPct = data?.context_window?.used_percentage;
const ctxSize = data?.context_window?.context_window_size;
const totalTokens =
  (data?.context_window?.total_input_tokens ?? 0) +
  (data?.context_window?.total_output_tokens ?? 0);
const cost = data?.cost?.total_cost_usd ?? 0;
const durMs = data?.cost?.total_duration_ms ?? 0;
const cwd = data?.workspace?.current_dir ?? data?.cwd ?? "";

// ── Token formatter (1500000 -> "1.5M", 94000 -> "94k", 9400 -> "9.4k") ──
const fmtTok = (n) => {
  if (n >= 1_000_000) {
    const m = n / 1_000_000;
    return `${parseFloat(m.toFixed(1))}M`;
  }
  if (n >= 1000) {
    const k = n / 1000;
    return `${k >= 100 ? Math.round(k) : parseFloat(k.toFixed(1))}k`;
  }
  return String(n);
};

// ── Context bar (ruby filled / white empty) + % + tokens used/total ──
const BAR_WIDTH = 14;
let ctxPart;
if (usedPct !== null && usedPct !== undefined) {
  const used = Math.round(usedPct);
  const filled = Math.max(0, Math.min(BAR_WIDTH, Math.round((used * BAR_WIDTH) / 100)));
  const bar = `${R}${"█".repeat(filled)}${G}${"░".repeat(BAR_WIDTH - filled)}${RESET}`;
  const pctColor = used >= 80 ? R : W;
  const usedTok = ctxSize ? Math.round((ctxSize * used) / 100) : totalTokens;
  const tokStr = ctxSize ? `${fmtTok(usedTok)}/${fmtTok(ctxSize)}` : fmtTok(usedTok);
  ctxPart = `${bar} ${pctColor}${used}%${RESET} ${SEP} ${G}${tokStr}${RESET}`;
} else {
  ctxPart = `${G}${"░".repeat(BAR_WIDTH)}${RESET} ${W}--%${RESET}`;
}

// ── Cost ──
const costPart = `${W}$${Number(cost).toFixed(2)}${RESET}`;

// ── Time ──
const totalSec = Math.floor(durMs / 1000);
const mins = Math.floor(totalSec / 60);
const secs = totalSec % 60;
const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
const timePart = `${G}${timeStr}${RESET}`;

// ── Git branch ──
let branch = "";
if (cwd) {
  try {
    branch = execSync("git --no-optional-locks symbolic-ref --short HEAD", {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    branch = "";
  }
}

// ── Assemble ──
const parts = [`${W}${model}${RESET}`, ctxPart, costPart, timePart];
if (branch) parts.push(`${R}\u{E0A0} ${branch}${RESET}`);

process.stdout.write(parts.join(` ${SEP} `));
