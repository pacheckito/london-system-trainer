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
        // Push duplicate position to keep arrays aligned
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

  // Clean move notation â strip emoji annotations and whitespace
  cleanNotation(move) {
    return move.replace(/[â­â ï¸!?]/g, '').trim();
  }

  // Load a specific position by index (0 = starting position)
  loadPosition(index) {
    if (index >= 0 && index < this.fens.length) {
      this.game.load(this.fens[index]);
    }
  }

  // Get all legal moves for the current position
  // Returns array of { from: 'e2', to: 'e4', san: 'e4', flags: '...', piece: 'p' }
  getLegalMoves() {
    return this.game.moves({ verbose: true });
  }

  // Get legal moves from a specific square
  // square is algebraic like 'e2'
  getLegalMovesFrom(square) {
    return this.game.moves({ square, verbose: true });
  }

  // Convert board row/col to algebraic notation
  // row 0 = rank 8, col 0 = file a
  static toAlgebraic(row, col) {
    return String.fromCharCode(97 + col) + (8 - row);
  }

  // Convert algebraic to row/col
  static fromAlgebraic(sq) {
    return [8 - parseInt(sq[1]), sq.charCodeAt(0) - 97];
  }

  // Try a move from (fromRow,fromCol) to (toRow,toCol)
  // Returns the move result if legal, null if illegal
  // Does NOT permanently make the move â call loadPosition() to navigate
  tryMove(fromRow, fromCol, toRow, toCol, promotion = 'q') {
    const from = GameEngine.toAlgebraic(fromRow, fromCol);
    const to = GameEngine.toAlgebraic(toRow, toCol);

    // Save current state
    const fen = this.game.fen();

    let result = null;
    try { result = this.game.move({ from, to, promotion }); } catch (e) { /* illegal */ }

    // Restore state (we don't want to permanently advance the game)
    this.game.load(fen);

    return result;
  }

  // Get the board as a 2D array in our format
  // uppercase = white (P, N, B, R, Q, K), lowercase = black, '' = empty
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

  // Get current FEN
  getFEN() {
    return this.game.fen();
  }

  // Whose turn is it?
  isWhiteTurn() {
    return this.game.turn() === 'w';
  }

  // Get position at a specific index
  getPositionAt(index) {
    if (index >= 0 && index < this.positions.length) {
      return this.positions[index];
    }
    return this.positions[0];
  }

  // Get FEN at a specific index
  getFENAt(index) {
    if (index >= 0 && index < this.fens.length) {
      return this.fens[index];
    }
    return this.fens[0];
  }

  // Get move details (from/to squares) for highlighting
  getMoveDetailAt(index) {
    if (index >= 0 && index < this.moveDetails.length) {
      return this.moveDetails[index];
    }
    return null;
  }

  // Validate all lines from repertoire data on startup
  // Returns map of lineId => errors[]
  static validateRepertoire(lines) {
    const engine = new GameEngine();
    const allErrors = {};

    for (const line of lines) {
      const errors = engine.loadLine(line.moves);
      if (errors.length > 0) {
        allErrors[line.id] = errors;
      }
    }

    return allErrors;
  }
}
