---
name: instructions
description: "Reguły zależne od typu pliku (file-type rules). USE FOR: zanim napiszesz/zreviewujesz kod danego typu sprawdź pasującą instrukcję — jak pisać Python, TypeScript/React, Markdown, oraz jak routować zmiany zależności (uv add). To NIE workflow — mówi JAK pracować z danym typem pliku, nie jak wykonać cały task."
---

## Kiedy używać

Zanim napiszesz lub zreviewujesz plik konkretnego typu — przeczytaj pasującą instrukcję z `references/`. To stabilne reguły zależne od typu pliku lub obszaru repo (nie workflow całego taska).

## Mapa plików

Lokalizacja: `references/` (obok tego pliku — samodzielne kopie, niezależne od reszty repo)

| Plik | Zasięg | Cel |
|---|---|---|
| `references/python.instructions.md` | `*.py` | standardy Pythona (skondensowany overview skilla `python`) |
| `references/typescript.instructions.md` | `*.ts`, `*.tsx` | standardy TypeScript / React |
| `references/markdown.instructions.md` | `*.md` | styl i struktura markdown |
| `references/dependency-workflow.instructions.md` | dependency changes / `pyproject.toml` | routing `uv add` do profili repo — **sklasyfikuj pakiet ZANIM użyjesz `uv add`** |

## Jak używać

1. Edytujesz / piszesz / reviewujesz plik → przeczytaj pasującą instrukcję z `references/` (dobierz po zasięgu w tabeli) i zastosuj jej reguły.
2. Zmieniasz zależności (`uv add`, `pyproject.toml`) → **zawsze** najpierw `references/dependency-workflow.instructions.md`.
3. Potrzebujesz głębszego kontekstu Pythona → skill `python` (`references/` 00-15). Tu masz skondensowany overview, tam pełny standard.

## Reguła praktyczna

Instructions to nie workflow. One mówią, **jak pracować z danym typem pliku**, a nie jak wykonać cały task.
