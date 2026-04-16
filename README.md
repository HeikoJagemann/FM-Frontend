# Fussball-Manager Frontend

Angular-Frontend für den Fussball-Manager.

> **Empfohlen:** Die Anwendung über das Startup-Skript im
> [FM-Backend](https://github.com/HeikoJagemann/fm-backend) starten —
> es übernimmt Datenbank, Backend und Frontend automatisch.

## Voraussetzungen

- Node.js 18+
- Angular CLI 19 (`npm install -g @angular/cli`)
- [FM-Backend](https://github.com/HeikoJagemann/fm-backend) läuft auf Port 8081

## Entwicklungsserver starten

```bash
cd D:\git\FM-Frontend
ng serve
```

App erreichbar unter `http://localhost:4200`.

## Funktionsumfang

### Startbildschirm
- **Spiel starten** löst die Liga-Generierung im Backend aus
- Fortschrittsanzeige (Progressbar) während die Ligen aufgebaut werden
- Auswahl aus 3 zufälligen Oberliga-Vereinen als Einstieg

### In-Game-Menü
| Bereich | Unterseiten |
|---------|-------------|
| Mannschaft | Kader, Aufstellung |
| Liga | Tabelle, Spielplan, Statistiken |
| Training | — |
| Finanzen | — |
| Umfeld | — |
| Jugend | — |

### Liga-Bereich
- **Tabelle:** Platz, Verein, Sp/G/U/N, Tore, Tordifferenz, Punkte
- **Spielplan:** Alle Spieltage mit Ergebnissen, ungespielt als „–:–"
- **Statistiken:** Gesamt-Übersicht, treffsicherste/beste Abwehr/meiste Siege

## Projektstruktur

```
src/app/
├── components/
│   ├── start-screen/        ← Startbildschirm mit Vereinsauswahl
│   ├── game-layout/         ← Hauptlayout mit Menüleiste
│   ├── mannschaft-layout/   ← Layout für Mannschafts-Unterseiten
│   ├── liga-layout/         ← Layout für Liga-Unterseiten
│   ├── spieler-liste/       ← Kadertabelle
│   ├── spieler-detail/      ← Spieler-Detailansicht
│   ├── aufstellung/         ← Aufstellungseditor
│   ├── tabelle/             ← Ligatabelle
│   ├── ergebnisse/          ← Spielplan & Ergebnisse
│   └── statistiken/         ← Liga-Statistiken
├── models/                  ← TypeScript-Interfaces (Verein, Liga, Spiel, ...)
└── services/                ← HTTP-Services (VereinService, LigaService, ...)
```

## Build

```bash
ng build
```

Build-Artefakte landen im Verzeichnis `dist/`.
