# MangaShift Website — Roadmap

Stan i plan dalszych prac. Aktualizowany w miarę postępu.

## ✅ Zrobione (sesja 2026-06-13/14)

- **Stack na bun + latest:** Next 16.2.9, React 19.2.7, TS 6, Tailwind 4.3, framer-motion 12.40.
  ESLint przypięty do 9 (Next 16 nie wspiera ESLint 10). bun.lock zamiast package-lock.
- **CI na bun:** workflow GitHub Pages (setup-bun + frozen-lockfile), akcje na Node-24 majors.
- **Naprawiony Preloader** (setState-in-effect → lazy useState init), lint czysty.
- **Sprzątanie:** usunięte stare artefakty MD (TODO/BRAINSTORM/ISSUES/EXECUTION/MOBILE),
  README przepisany, dane osobowe wyczyszczone z plików i z historii git (amend+force-push).
- **.gitignore** w stylu sekcyjnym (`# ── ──`), okrojony do Next/bun.
- **Sekcja beta (ContactSection):** formularz email + zgoda RODO → Google Forms
  (ukryty no-cors POST, honeypot anti-spam). Działa, zapisuje do arkusza.
  - Form action: `https://docs.google.com/forms/d/e/1FAIpQLScyTs1gTH1kmVC8EHkB_pdPsdrWwEtGIwLvQYu4StRfSkVYpA/formResponse`
  - entry email: `entry.1654989478` · entry zgoda: `entry.980875902` = "Yes, I agree"

## 🎯 W TOKU: Redesign w stylu suminagashi

Kierunek: przebudowa wyglądu strony w stylu nawiązującym do `suminagashi-fjdbyyqi-demo/`
(płynne, atramentowe/marmurkowe tło — suminagashi = japońska sztuka marmurkowania).

**Zasada pracy (ustalona z userem):** sekcja po sekcji, według screenów/makiet od usera.
User dostarcza wizję wizualną — bez niej nie zgadujemy (skill `simple`).

Sekcje do przejścia: Hero → Demo → About → Beta/Contact → FAQ → Footer.

## 📋 Backlog (później, gdy user zdecyduje)

- **i18n** — strona ma być tłumaczona na ~15-30 języków (next-intl + przełącznik). Duża osobna funkcja.
- **Import ~30 istniejących maili** do arkusza Google Sheets.
- **Własna domena + przeniesienie z GitHub Pages** na docelowy hosting.
- **Audyt jakości** — spójność tekstów, a11y, wydajność mobilna.

## ⚠️ Do posprzątania przez usera

- Usunąć testowe wpisy z arkusza Google: `FINAL-CORRECT-test@example.com`,
  `TEST-A-1654@example.com`, `TEST-B-6984@example.com`, `test-claude-verify@example.com`.
