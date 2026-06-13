# Data Directory

Katalog na pliki JSON z danymi demo.

## Przykładowa struktura danych:

### `chainsawman-demo.json`

```json
{
  "title": "Chainsawman Chapter 1 - Demo",
  "panels": [
    {
      "id": 1,
      "image": "/images/chainsawman/panel-01.jpg",
      "text": "Denji, młody łowca diabłów, walczy o przetrwanie...",
      "audioTimestamp": 0,
      "duration": 5.2,
      "bounds": {
        "x": 0,
        "y": 0,
        "width": 800,
        "height": 1200
      }
    },
    {
      "id": 2,
      "image": "/images/chainsawman/panel-02.jpg",
      "text": "Jego jedynym towarzyszem jest Pochita...",
      "audioTimestamp": 5.2,
      "duration": 4.8
    }
  ],
  "audio": "/audio/chainsawman-demo.mp3",
  "totalDuration": 120.5
}
```

## Pliki do utworzenia:

- `chainsawman-demo.json` - Dane demo dla playera
- `manga-list.json` - Lista dostępnych manga (opcjonalnie)
- `settings.json` - Ustawienia aplikacji
