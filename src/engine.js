import { Chess } from 'chess.js';

export class GameEngine {
  constructor() {
    this.game = new Chess();
    this.positions = [];  // Array of board state arrays (8x8, uppercase=white, lowercase=black, ''=empty)
    this.fens = [];       // Array of FEN strings for each position
    this.moveDetails = []; // Array of { from, to, san } for highlighting
  }

  // Reset to initial position
  reset() {
    this.game.reset();
    this.positions = [this.getBoard()];
    this.fens = [this.game.fen()];
    this.moveDetails = [];
  }

  // Load a repertoire line's moves. Each move pair is { w: 'e4', b: 'e5' }
  // Strip emoji/annotations before passing to chess.js
  // Returns array of any moves that failed validation (for debugging)
  loadLine(moves) {
    this.reset();
    const errors = [];

    for (let i = 0; i < moves.length; i++) {
      const pair = moves[i];

      // White move
      const wClean = this.cleanNotation(pair.w);
      let wResult = null;
      try { wResult = this.game.move(wClean); } catch (e) { /* invalid move */ }
      if (wResult) {
        this.positions.push(this.getBoard());
        this.fens.push(this.game.fen());
        this.moveDetails.push({
          from: wResult.from,
          to: wResult.to,
          san: wResult.san
        });
      } else {
        errors.push({ move: i + 1, side: 'white', notation: pair.w, clean: wClean });
        this.positions.push(this.getBoard());
        this.fens.push(this.game.fen());
        this.moveDetails.push(null);
      }

      // Black move
      const bClean = this.cleanNotation(pair.b);
      let bResult = null;
      try { bResult = this.game.move(bClean); } catch (e) { /* invalid move */ }
      if (bResult) {
        this.positions.push(this.getBoard());
        this.fens.push(this.game.fen());
        this.moveDetails.push({
          from: bResult.from,
          to: bResult.to,
          san: bResult.san
        });
      } else {
        errors.push({ move: i + 1, side: 'black', notation: pair.b, clean: bClean });
        this.positions.push(this.getBoard());
        this.fens.push(this.game.fen());
        this.moveDetails.push(null);
      }
    }

    return errors;
  }

  cleanNotation(move) {
    return move.replace(/[⭐⚠️!?]/g, '').trim();
  }

  loadPosition(index) {
    if (index >= 0 && index < this.fens.length) {
      this.game.load(this.fens[index]);
    }
  }

  getLegalMoves() {
    return this.game.moves({ verbose: true });
  }

  getLegalMovesFrom(square) {
    return this.game.moves({ square, verbose: true });
  }

  static toAlgebraic(row, col) {
    return String.fromCharCode(97 + col) + (8 - row);
  }

  static fromAlgebraic(sq) {
    return [8 - parseInt(sq[1]), sq.charCodeAt(0) - 97];
  }

  tryMove(fromRow, fromCol, toRow, toCol, promotion = 'q') {
    const from = GameEngine.toAlgebraic(fromRow, fromCol);
    const to = GameEngine.toAlgebraic(toRow, toCol);
    const fen = this.game.fen();
    let result = null;
    try { result = this.game.move({ from, to, promotion }); } catch (e) { }
    this.game.load(fen);
    return result;
  }

  getBoard() {
    const board = this.game.board();
    return board.map(row =>
      row.map(cell => {
        if (!cell) return '';
        const piece = cell.type;
        return cell.color === 'w' ? piece.toUpperCase() : piece.toLowerCase();
      })
    );
  }

  getFEN() { return this.game.fen(); }
  isWhiteTurn() { return this.game.turn() === 'w'; }

  getPositionAt(index) {
    return (index >= 0 && index < this.positions.length) ? this.positions[index] : this.positions[0];
  }

  getFENAt(index) {
    return (index >= 0 && index < this.fens.length) ? this.fens[index] : this.fens[0];
  }

  getMoveDetailAt(index) {
    return (index >= 0 && index < this.moveDetails.length) ? this.moveDetails[index] : null;
  }

  static validateRepertoire(lines) {
    const engine = new GameEngine();
    const allErrors = {};
    for (const line of lines) {
      const errors = engine.loadLine(line.moves);
      if (errors.length > 0) allErrors[line.id] = errors;
    }
    return allErrors;
  }
}
