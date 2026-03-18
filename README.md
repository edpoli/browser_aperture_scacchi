# ♟️ Explorer Aperture Scacchi

Un browser interattivo delle aperture scacchistiche costruito con React. Naviga tra le aperture classiche, visualizza le mosse passo-passo su una scacchiera e salva le tue preferite.

🔗 **[Demo live](https://aperturescacchi.vercel.app/)**

---

## Panoramica

Explorer Aperture è una single-page application che permette di esplorare le principali aperture degli scacchi in modo visuale e interattivo. Ogni apertura include la notazione algebrica, una descrizione della strategia e una scacchiera integrata che mostra la posizione dopo ogni mossa. La logica scacchistica è gestita da `chess.js`, che calcola le posizioni FEN in tempo reale.

## Funzionalità

- **Catalogo aperture** — 8 aperture classiche (Italiana, Siciliana, Spagnola, Francese, Inglese, Nimzo-Indiana, Gambetto di Re, Caro-Kann) con notazione e descrizione strategica.
- **Scacchiera interattiva** — Visualizzazione della posizione mossa per mossa con navigazione avanti/indietro e selezione diretta di ogni mossa.
- **Filtri combinati** — Ricerca per nome, filtro per colore (bianco/nero) e livello di difficoltà (principiante, intermedio, avanzato).
- **Preferiti** — Sistema di bookmarking per salvare le aperture preferite con contatore e filtro dedicato.
- **Scacchiera in Unicode** — Rendering puro CSS/Unicode dei pezzi, senza immagini esterne, tramite componente custom `Scacchiera`.

## Tech Stack

| Tecnologia | Ruolo |
|---|---|
| **React 19** | UI e gestione dello stato |
| **chess.js** | Logica scacchistica e calcolo posizioni FEN |
| **Tailwind CSS 4** | Styling utility-first |
| **Vite 7** | Build tool e dev server |

## Struttura del Progetto

```
src/
├── aperture.js         # Dataset delle aperture (mosse, PGN, descrizioni)
├── App.jsx             # Layout, filtri e stato globale
├── AperturaCard.jsx    # Card apertura con scacchiera espandibile
├── Scacchiera.jsx      # Scacchiera 8×8 con pezzi Unicode
└── main.jsx            # Entry point
```

## Come Funziona

Ogni apertura contiene le mosse in formato PGN (`mossePgn`). Quando l'utente espande una card, il componente `AperturaCard` usa `chess.js` per ricostruire la partita mossa per mossa e genera la stringa FEN corrispondente. Il componente `Scacchiera` riceve la FEN, crea l'istanza `Chess` e renderizza la griglia 8×8 con i pezzi Unicode appropriati.

## Installazione

```bash
git clone https://github.com/edpoli/browser_aperture_scacchi.git
cd browser_aperture_scacchi
npm install
npm run dev
```

L'app sarà disponibile su `http://localhost:5173`.

## Build per la Produzione

```bash
npm run build
npm run preview
```

## Licenza

MIT
