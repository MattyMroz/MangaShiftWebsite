# Fonts Directory

Katalog na custom fonty projektu.

## Rekomendowane fonty:

- **Noto Sans JP** - Japoński font (manga/anime vibe)
- **Inter** - Nowoczesny font sans-serif (UI)
- **JetBrains Mono** - Monospace (kod/tech elementy)

## Jak dodać fonty:

1. Pobierz fonty z [Google Fonts](https://fonts.google.com)
2. Umieść pliki `.ttf` lub `.woff2` tutaj
3. Zaimportuj w `app/layout.tsx`:

```tsx
import localFont from 'next/font/local'

const notoSansJP = localFont({
  src: '../public/fonts/NotoSansJP-Regular.ttf',
  variable: '--font-noto-sans-jp',
})
```
