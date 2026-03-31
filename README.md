# London System â Interactive Repertoire Trainer

An interactive chess opening trainer built for players who want to learn and practice the London System (1. d4 2. Bf4). Features 28 annotated lines covering the main repertoire and common opponent responses.

## Features

- **Study Mode** â Click through each move with commentary explaining the ideas behind every position. Opponent mistakes are highlighted in red.
- **Quiz Mode** â Test your knowledge by finding the correct moves on the board. Click-to-move with legal move validation powered by [chess.js](https://github.com/jhlywa/chess.js).
- **28 Opening Lines** â 12 main lines covering all major Black responses (KID, Slav, QGD, Dutch, GrÃ¼nfeld, etc.) plus 16 "What If?" branches for common deviations.
- **Stockfish Eval Bar** â Real-time position evaluation using Stockfish WASM, with a static fallback when the engine isn't available.
- **Mistake & Tactics Panels** â Each line includes annotated opponent mistakes and tactical motifs to watch for.
- **Auto-play & Board Flip** â Step through lines automatically or flip the board to see Black's perspective.

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
london-system-trainer/
âââ index.html              # App shell
âââ package.json
âââ vite.config.js
âââ src/
    âââ main.js             # App logic, board rendering, quiz mode, eval
    âââ engine.js           # chess.js wrapper (legal moves, validation)
    âââ styles.css           # Dark theme styles
    âââ data/
        âââ repertoire.js   # All 28 annotated opening lines
```

## Tech Stack

- **Vite** â Build tooling and dev server
- **chess.js** â Legal move generation and validation
- **Stockfish WASM** â Position evaluation (loaded from CDN)
- Vanilla JavaScript with ES modules â no framework needed

## Repertoire Coverage

The trainer covers White's London System setup (d4, Bf4, e3, Nf3, Bd3, Nbd2, O-O) against all major Black defenses:

| Response | Lines |
|---|---|
| King's Indian / g6 setups | Main line + branches |
| Slav / c6 setups | Main line + branches |
| QGD / e6 setups | Main line + bishop trade, e5 push |
| Dutch (f5) | Exploiting the weakened kingside |
| GrÃ¼nfeld (Nf6 + g6 + d5) | Punishing the early d5 |
| Benoni / c5 | Holding the center |
| Early Bg4 pin | Clean unpin technique |
| Early Qb6 | Defending b2 with Qc1 |
| Fianchetto (b6 + Bb7) | "Tall pawn" strategy |

## License

MIT
