# Images Directory

Katalog na obrazy projektu.

## Struktura (sugerowana):

```
images/
├── logo/               # Loga MangaShift
├── chainsawman/        # Panele manga Chainsawman (demo)
│   ├── panel-01.jpg
│   ├── panel-02.jpg
│   └── ...
├── hero/               # Hero section images
├── features/           # Feature showcase images
└── icons/              # Custom icons/SVG
```

## Format obrazów:

- **Manga panels**: `.jpg` lub `.webp` (lepsze dla web)
- **Icons**: `.svg` (skalowalne)
- **Photos**: `.jpg` / `.webp`

## Optymalizacja:

Next.js automatycznie optymalizuje obrazy z `next/image`, ale dla GitHub Pages (static export):
- Używaj już zoptymalizowanych obrazów (< 500KB na panel)
- Rozdzielczość: 1920px szerokość max
