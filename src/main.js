// ============================================================
// London System Interactive Repertoire Trainer — Main Application
// ============================================================
import { GameEngine } from './engine.js';
import { LINES } from './data/repertoire.js';
import './styles.css';

// ============================================================
// PIECE DISPLAY
// ============================================================
const PIECES = {
  K: '\u265A', Q: '\u265B', R: '\u265C', B: '\u265D', N: '\u265E', P: '\u265F',
  k: '\u265A', q: '\u265B', r: '\u265C', b: '\u265D', n: '\u265E', p: '\u265F',
};
function isWhitePiece(p) { return p && p === p.toUpperCase(); }

// ============================================================
// APP STATE
// ============================================================
const engine = new GameEngine();

let currentLine = null;
let currentLineIndex = -1;
let currentMoveIndex = -1;
let flipped = false;
let autoPlaying = false;
let autoTimer = null;
let appMode = 'study';
let selectedSquare = null;
let legalTargets = [];
let quizBoardActive = false;
let quizMoveCallback = null;
let quizScore = { correct: 0, wrong: 0, total: 0 };
let quizState = null;

// Stockfish
let stockfish = null;
let sfReady = false;
let evalQueue = null;
let sfFailed = false;

// ============================================================
// DOM REFERENCES
// ============================================================
const $ = (id) => document.getElementById(id);

// ============================================================
// VALIDATION ON STARTUP
// ============================================================
function validateOnStartup() {
  const errors = GameEngine.validateRepertoire(LINES);
  const errorKeys = Object.keys(errors);
  if (errorKeys.length > 0) {
    console.warn('Repertoire validation errors:', errors);
    const banner = document.createElement('div');
    banner.className = 'validation-banner';
    let msg = '<strong>Move validation warnings:</strong> ';
    for (const id of errorKeys) {
      const lineErrors = errors[id];
      const lineName = LINES.find(l => l.id === id)?.name || id;
      for (const err of lineErrors) {
        msg += `<br><code>${lineName}</code> — move ${err.move} (${err.side}): <code>${err.notation}</code> could not be validated`;
      }
    }
    banner.innerHTML = msg;
    $('content').prepend(banner);
  }
}

// ============================================================
// SIDEBAR
// ============================================================
function renderSidebar() {
  const sb = $('sidebar');
  let html = '<div class="sidebar-section">Opening Lines</div>';
  let currentSection = null;

  LINES.forEach((line, i) => {
    if (line.section && line.section !== currentSection) {
      currentSection = line.section;
      html += `<div class="sidebar-section" style="margin-top:12px; color:#4ecdc4;">${currentSection}</div>`;
    }
    const active = currentLine && currentLine.id === line.id ? 'active' : '';
    html += `<button class="line-btn ${active}" data-line-idx="${i}" style="${line.section ? 'padding-left:24px; font-size:0.8em;' : ''}">
      ${line.name}
      <span class="freq">${line.freq}</span>
    </button>`;
  });
  sb.innerHTML = html;

  // Attach click handlers
  sb.querySelectorAll('.line-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.lineIdx);
      selectLine(idx);
    });
  });
}

// ============================================================
// BOARD RENDERER
// ============================================================
function renderBoard(board) {
  const el = $('board');
  let html = '';

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const displayR = flipped ? 7 - r : r;
      const displayC = flipped ? 7 - c : c;
      const isLight = (displayR + displayC) % 2 === 0;
      const piece = board[displayR][displayC];
      const pieceChar = piece ? PIECES[piece] : '';
      const pieceClass = piece ? (isWhitePiece(piece) ? 'piece-white' : 'piece-black') : '';

      let classes = `square ${isLight ? 'light' : 'dark'}`;

      // Highlight last move
      if (currentMoveIndex >= 0) {
        const detail = engine.getMoveDetailAt(currentMoveIndex);
        if (detail) {
          const [fromR, fromC] = GameEngine.fromAlgebraic(detail.from);
          const [toR, toC] = GameEngine.fromAlgebraic(detail.to);
          if (fromR === displayR && fromC === displayC) classes += ' last-move';
          if (toR === displayR && toC === displayC) classes += ' last-move';
        }
      }

      // Selected square
      if (selectedSquare && selectedSquare[0] === displayR && selectedSquare[1] === displayC) {
        classes += ' selected';
      }

      // Legal target dots
      const isTarget = legalTargets.some(t => t[0] === displayR && t[1] === displayC);
      if (isTarget) {
        classes += board[displayR][displayC] ? ' move-target-capture' : ' move-target';
      }

      // Interactive in quiz mode
      if (quizBoardActive) classes += ' interactive';

      html += `<div class="${classes}" data-row="${displayR}" data-col="${displayC}">${pieceChar ? `<span class="${pieceClass}">${pieceChar}</span>` : ''}</div>`;
    }
  }
  el.innerHTML = html;

  // Board click handler
  if (quizBoardActive) {
    el.querySelectorAll('.square').forEach(sq => {
      sq.addEventListener('click', () => {
        const row = parseInt(sq.dataset.row);
        const col = parseInt(sq.dataset.col);
        boardClick(row, col);
      });
    });
  }
}

// ============================================================
// BOARD CLICK-TO-MOVE (Quiz Mode)
// ============================================================
function boardClick(row, col) {
  if (!quizBoardActive || !currentLine) return;

  const posIdx = currentMoveIndex + 1;
  const board = engine.getPositionAt(posIdx);
  const piece = board[row][col];

  // Load the position into chess.js for legal move checking
  engine.loadPosition(posIdx);

  if (selectedSquare) {
    const [fromR, fromC] = selectedSquare;
    const fromPiece = board[fromR][fromC];

    // Clicking same square — deselect
    if (fromR === row && fromC === col) {
      selectedSquare = null;
      legalTargets = [];
      renderBoard(board);
      return;
    }

    // Clicking another white piece — reselect
    if (piece && isWhitePiece(piece)) {
      selectedSquare = [row, col];
      legalTargets = getLegalTargetsForSquare(row, col);
      renderBoard(board);
      return;
    }

    // Check if this is a legal target
    const isLegal = legalTargets.some(t => t[0] === row && t[1] === col);
    if (!isLegal) {
      selectedSquare = null;
      legalTargets = [];
      renderBoard(board);
      return;
    }

    // Try the move with chess.js to get proper SAN notation
    const moveResult = engine.tryMove(fromR, fromC, row, col);

    // Clear selection
    selectedSquare = null;
    legalTargets = [];

    if (moveResult && quizMoveCallback) {
      quizMoveCallback(moveResult.san, fromR, fromC, row, col);
    } else {
      renderBoard(board);
    }
  } else {
    // First click — select a white piece (only White's moves in quiz)
    if (piece && isWhitePiece(piece)) {
      selectedSquare = [row, col];
      legalTargets = getLegalTargetsForSquare(row, col);
      renderBoard(board);
    }
  }
}

function getLegalTargetsForSquare(row, col) {
  const square = GameEngine.toAlgebraic(row, col);
  const moves = engine.getLegalMovesFrom(square);
  return moves.map(m => GameEngine.fromAlgebraic(m.to));
}

// ============================================================
// MOVE LIST
// ============================================================
function renderMoveList() {
  if (!currentLine) return;
  const el = $('moveList');
  let html = '';

  currentLine.moves.forEach((m, i) => {
    const wIdx = i * 2;
    const bIdx = i * 2 + 1;
    const wCurrent = currentMoveIndex === wIdx ? 'current' : '';
    const bCurrent = currentMoveIndex === bIdx ? 'current' : '';

    html += `<span class="move-num">${i + 1}.</span>`;
    html += `<span class="move-item white-move ${wCurrent}" data-move-idx="${wIdx}">${cleanDisplay(m.w)}</span>`;
    html += `<span class="move-item black-move ${bCurrent}" data-move-idx="${bIdx}">${cleanDisplay(m.b)}</span>`;
  });
  el.innerHTML = html;

  el.querySelectorAll('.move-item').forEach(item => {
    item.addEventListener('click', () => {
      goToMove(parseInt(item.dataset.moveIdx));
    });
  });
}

function renderQuizMoveList(quizMoveIdx) {
  if (!currentLine) return;
  const el = $('moveList');
  let html = '';

  currentLine.moves.forEach((m, i) => {
    const wIdx = i * 2;
    const bIdx = i * 2 + 1;
    const wCurrent = currentMoveIndex === wIdx ? 'current' : '';
    const bCurrent = currentMoveIndex === bIdx ? 'current' : '';
    const isHidden = i >= quizMoveIdx;

    html += `<span class="move-num">${i + 1}.</span>`;
    if (isHidden) {
      html += `<span class="move-item white-move" style="color:#444">???</span>`;
      html += `<span class="move-item black-move" style="color:#333">???</span>`;
    } else {
      html += `<span class="move-item white-move ${wCurrent}" data-move-idx="${wIdx}">${cleanDisplay(m.w)}</span>`;
      html += `<span class="move-item black-move ${bCurrent}" data-move-idx="${bIdx}">${cleanDisplay(m.b)}</span>`;
    }
  });
  el.innerHTML = html;

  el.querySelectorAll('.move-item[data-move-idx]').forEach(item => {
    item.addEventListener('click', () => {
      goToMove(parseInt(item.dataset.moveIdx));
    });
  });
}

function cleanDisplay(move) {
  return move.replace(/[⭐⚠️]/g, '').trim();
}

// ============================================================
// COMMENTARY
// ============================================================
function renderCommentary() {
  const el = $('commentary');
  if (!currentLine) {
    el.innerHTML = 'Choose a line from the sidebar to begin studying.';
    return;
  }
  if (currentMoveIndex < 0) {
    el.innerHTML = `<strong>${currentLine.name}</strong><br>${currentLine.description}<br><br>Press \u25B6 or click a move to start.`;
    return;
  }

  const moveNum = Math.floor(currentMoveIndex / 2);
  const isWhite = currentMoveIndex % 2 === 0;
  const moveData = currentLine.moves[moveNum];
  const moveNotation = isWhite ? moveData.w : moveData.b;
  const comment = isWhite ? moveData.wComment : moveData.bComment;
  const color = isWhite ? 'White' : 'Black';

  el.innerHTML = `<span class="move-label">${moveNum + 1}${isWhite ? '.' : '...'} ${cleanDisplay(moveNotation)}</span> (${color})<br>${comment}`;
}

// ============================================================
// MISTAKES & TACTICS
// ============================================================
function renderMistakes() {
  const el = $('mistakesPanel');
  if (!currentLine || !currentLine.mistakes || !currentLine.mistakes.length) {
    el.innerHTML = '';
    return;
  }
  let html = '<div class="mistake-box"><h3>\u26A0\uFE0F Opponent Mistakes to Exploit</h3>';
  currentLine.mistakes.forEach(m => {
    html += `<div class="mistake-item">
      <div><span class="mistake-move">${m.move}</span> <span style="color:#888">(${m.atMove})</span></div>
      <div style="margin-top:4px; font-size:0.88em">${m.desc}</div>
      <div style="margin-top:4px"><span class="punishment">\u26A1 Punish:</span> <span style="font-size:0.88em">${m.howToPunish}</span></div>
    </div>`;
  });
  html += '</div>';
  el.innerHTML = html;
}

function renderTactics() {
  const el = $('tacticsPanel');
  if (!currentLine || !currentLine.tactics || !currentLine.tactics.length) {
    el.innerHTML = '';
    return;
  }
  let html = '<div class="tactics-box"><h3>\u265F Middlegame Tactics</h3><ul>';
  currentLine.tactics.forEach(t => {
    html += `<li>${t}</li>`;
  });
  html += '</ul></div>';
  el.innerHTML = html;
}

// ============================================================
// NAVIGATION
// ============================================================
function selectLine(idx) {
  stopAutoPlay();
  currentLine = LINES[idx];
  currentLineIndex = idx;
  currentMoveIndex = -1;

  // Load line into chess.js engine (validates all moves!)
  const errors = engine.loadLine(currentLine.moves);
  if (errors.length > 0) {
    console.warn(`Line "${currentLine.name}" has ${errors.length} invalid moves:`, errors);
  }

  renderSidebar();
  renderBoard(engine.getPositionAt(0));

  if (appMode === 'quiz') {
    generateQuizQuestion();
  } else {
    renderMoveList();
    renderCommentary();
    renderMistakes();
    renderTactics();
  }
  $('lineTitle').textContent = currentLine.name;
  requestEval(0);
}

function goToMove(idx) {
  if (!currentLine) return;
  const maxIdx = currentLine.moves.length * 2 - 1;
  currentMoveIndex = Math.max(-1, Math.min(idx, maxIdx));
  renderBoard(engine.getPositionAt(currentMoveIndex + 1));
  if (appMode !== 'quiz') renderMoveList();
  renderCommentary();
  requestEval(currentMoveIndex + 1);
}

function goToStart() { stopAutoPlay(); goToMove(-1); }
function goBack() { stopAutoPlay(); goToMove(currentMoveIndex - 1); }
function goForward() { goToMove(currentMoveIndex + 1); }
function goToEnd() { stopAutoPlay(); if (currentLine) goToMove(currentLine.moves.length * 2 - 1); }

function flipBoard() {
  flipped = !flipped;
  const board = currentLine ? engine.getPositionAt(currentMoveIndex + 1) : engine.getPositionAt(0);
  renderBoard(board);
  // Update coordinates
  const coordsRow = $('coordsRow');
  const files = flipped ? 'hgfedcba' : 'abcdefgh';
  coordsRow.innerHTML = files.split('').map(f => `<span>${f}</span>`).join('');
}

function toggleAutoPlay() {
  if (autoPlaying) { stopAutoPlay(); return; }
  autoPlaying = true;
  $('autoBtn').classList.add('active-toggle');
  $('autoBtn').textContent = '\u23F8 Stop';
  autoStep();
}

function autoStep() {
  if (!autoPlaying || !currentLine) { stopAutoPlay(); return; }
  const maxIdx = currentLine.moves.length * 2 - 1;
  if (currentMoveIndex >= maxIdx) { stopAutoPlay(); return; }
  goForward();
  autoTimer = setTimeout(autoStep, 1200);
}

function stopAutoPlay() {
  autoPlaying = false;
  if (autoTimer) clearTimeout(autoTimer);
  autoTimer = null;
  const btn = $('autoBtn');
  if (btn) {
    btn.classList.remove('active-toggle');
    btn.textContent = '\u23F5 Auto';
  }
}

// ============================================================
// MODE TOGGLE
// ============================================================
function setMode(mode) {
  appMode = mode;
  quizBoardActive = (mode === 'quiz');
  selectedSquare = null;
  legalTargets = [];
  $('studyModeBtn').classList.toggle('active', mode === 'study');
  $('quizModeBtn').classList.toggle('active', mode === 'quiz');

  if (mode === 'quiz') {
    $('quizPanel').style.display = 'block';
    $('mistakesPanel').style.display = 'none';
    $('tacticsPanel').style.display = 'none';
    generateQuizQuestion();
  } else {
    quizBoardActive = false;
    quizMoveCallback = null;
    $('boardPrompt').innerHTML = '';
    $('quizPanel').style.display = 'none';
    $('mistakesPanel').style.display = '';
    $('tacticsPanel').style.display = '';
    if (currentLine) {
      renderBoard(engine.getPositionAt(currentMoveIndex + 1));
      renderMistakes();
      renderTactics();
    }
  }
}

// ============================================================
// QUIZ MODE
// ============================================================
function generateQuizQuestion() {
  const mainLines = LINES.filter(l => !l.section);
  const allLines = Math.random() < 0.7 ? mainLines : LINES;
  const lineIdx = Math.floor(Math.random() * allLines.length);
  const line = allLines[lineIdx];
  const globalIdx = LINES.indexOf(line);

  const minMove = 1;
  const maxMove = line.moves.length - 1;
  const moveIdx = minMove + Math.floor(Math.random() * (maxMove - minMove + 1));

  currentLine = line;
  currentLineIndex = globalIdx;
  engine.loadLine(currentLine.moves);
  renderSidebar();
  $('lineTitle').textContent = '\uD83E\uDDE0 Quiz Mode';

  const targetMoveIndex = moveIdx * 2 - 1;
  currentMoveIndex = Math.max(-1, targetMoveIndex);

  // Enable board interaction
  quizBoardActive = true;
  selectedSquare = null;
  legalTargets = [];

  // Load position for legal move generation
  engine.loadPosition(currentMoveIndex + 1);
  renderBoard(engine.getPositionAt(currentMoveIndex + 1));
  renderQuizMoveList(moveIdx);

  // Generate options
  const correctMove = engine.cleanNotation(line.moves[moveIdx].w);
  const distractors = generateDistractors(correctMove);
  const options = shuffle([correctMove, ...distractors]);

  quizState = { lineIdx: globalIdx, moveIdx, answered: false, correctMove };

  // Board move callback — uses chess.js SAN notation
  quizMoveCallback = function (san) {
    if (quizState.answered) return;
    const normPlayer = normalizeNotation(san);
    const normCorrect = normalizeNotation(correctMove);
    handleQuizAnswer(normPlayer === normCorrect, san, correctMove);
  };

  $('boardPrompt').innerHTML = '<div class="quiz-board-prompt">Click a white piece to move it \u2014 or use the buttons below</div>';

  const moveNum = moveIdx + 1;
  let html = `<div class="quiz-panel">
    <h3>\uD83E\uDDE0 What's White's Move?</h3>
    <div class="quiz-score" id="quizScoreDisplay">
      <span class="quiz-score-item quiz-score-correct">\u2713 ${quizScore.correct}</span>
      <span class="quiz-score-item quiz-score-wrong">\u2717 ${quizScore.wrong}</span>
      <span class="quiz-score-item quiz-score-total">${quizScore.total} total</span>
      ${quizScore.total > 0 ? `<span class="quiz-score-item" style="color:#aaa">(${Math.round(quizScore.correct / quizScore.total * 100)}%)</span>` : ''}
    </div>
    <div class="quiz-prompt">
      <strong>${line.name}</strong><br>
      Move <strong>${moveNum}</strong> \u2014 Move a piece on the board or click a button:
    </div>
    <div class="quiz-options" id="quizOptions"></div>
    <div id="quizResult"></div>
  </div>`;
  $('quizPanel').innerHTML = html;

  // Create quiz option buttons with event listeners
  const optContainer = $('quizOptions');
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => quizAnswer(opt, btn));
    optContainer.appendChild(btn);
  });

  $('commentary').innerHTML = `<strong>Quiz:</strong> ${line.name}<br>Move ${moveNum} \u2014 Move a piece on the board!`;
}

function handleQuizAnswer(isCorrect, playerMove, correctMove) {
  if (quizState.answered) return;
  quizState.answered = true;
  quizBoardActive = false;
  quizMoveCallback = null;
  quizScore.total++;
  selectedSquare = null;
  legalTargets = [];

  const line = LINES[quizState.lineIdx];
  const moveData = line.moves[quizState.moveIdx];

  // Highlight correct button
  document.querySelectorAll('.quiz-opt').forEach(btn => {
    if (normalizeNotation(btn.textContent) === normalizeNotation(correctMove)) {
      btn.classList.add('correct');
    }
  });

  if (isCorrect) {
    quizScore.correct++;
    $('boardPrompt').innerHTML = `<div class="quiz-board-prompt correct">\u2713 Correct! ${correctMove}</div>`;
    $('quizResult').innerHTML = `
      <div class="quiz-result correct-result">
        <strong>\u2713 Correct!</strong> ${moveData.wComment}
      </div>
      <button class="quiz-next-btn" id="quizNextBtn">Next Question \u2192</button>`;
  } else {
    quizScore.wrong++;
    $('boardPrompt').innerHTML = `<div class="quiz-board-prompt wrong">\u2717 You played ${playerMove} \u2014 correct was ${correctMove}</div>`;
    $('quizResult').innerHTML = `
      <div class="quiz-result wrong-result">
        <strong>\u2717 The correct move was ${correctMove}</strong><br>${moveData.wComment}
      </div>
      <button class="quiz-next-btn" id="quizNextBtn">Next Question \u2192</button>`;
  }

  $('quizNextBtn').addEventListener('click', generateQuizQuestion);

  // Show the correct position
  const correctIdx = quizState.moveIdx * 2;
  currentMoveIndex = correctIdx;
  renderBoard(engine.getPositionAt(currentMoveIndex + 1));

  // Update score display
  $('quizScoreDisplay').innerHTML = `
    <span class="quiz-score-item quiz-score-correct">\u2713 ${quizScore.correct}</span>
    <span class="quiz-score-item quiz-score-wrong">\u2717 ${quizScore.wrong}</span>
    <span class="quiz-score-item quiz-score-total">${quizScore.total} total</span>
    ${quizScore.total > 0 ? `<span class="quiz-score-item" style="color:#aaa">(${Math.round(quizScore.correct / quizScore.total * 100)}%)</span>` : ''}`;
}

function quizAnswer(answer, btnEl) {
  if (quizState.answered) return;
  const correct = quizState.correctMove;
  const isCorrect = normalizeNotation(answer) === normalizeNotation(correct);
  if (btnEl && !isCorrect) btnEl.classList.add('wrong');
  handleQuizAnswer(isCorrect, answer, correct);
}

function generateDistractors(correct) {
  const londonMoves = [
    'Nf3', 'Bd3', 'Be2', 'Bg3', 'Bh2', 'c3', 'c4', 'e3', 'e4', 'f4', 'f3',
    'Nbd2', 'Ne5', 'Nc3', 'O-O', 'Qe2', 'Qf3', 'Qd3', 'Qc1', 'Qc2',
    'h3', 'a4', 'a3', 'b3', 'g4', 'Bb5', 'Bc4', 'Bb1', 'Bf4', 'd5',
    'Nd2', 'Nb3', 'Nc4', 'Re1', 'Rb1', 'Bg5', 'hxg3', 'exd4',
    'dxe5', 'dxc5', 'Nxc6', 'bxc3', 'Nxc3',
  ];
  const filtered = londonMoves.filter(m => normalizeNotation(m) !== normalizeNotation(correct));
  const shuffled = shuffle(filtered);
  return shuffled.slice(0, 3);
}

function normalizeNotation(n) {
  return n.replace(/[+#!?\u2B50\u26A0\uFE0Fx]/g, '')
    .replace(/O-O-O/g, 'OOO')
    .replace(/O-O/g, 'OO')
    .replace(/0-0-0/g, 'OOO')
    .replace(/0-0/g, 'OO')
    .trim()
    .toLowerCase();
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============================================================
// STOCKFISH EVAL
// ============================================================
function initStockfish() {
  const SF_URL = 'https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js';
  fetch(SF_URL)
    .then(r => { if (!r.ok) throw new Error('fetch failed'); return r.text(); })
    .then(code => {
      const blob = new Blob([code], { type: 'application/javascript' });
      stockfish = new Worker(URL.createObjectURL(blob));
      stockfish.onerror = () => { sfFailed = true; };
      stockfish.onmessage = function (e) {
        const line = typeof e.data === 'string' ? e.data : '';
        if (line === 'uciok') {
          sfReady = true;
          stockfish.postMessage('setoption name Skill Level value 20');
          stockfish.postMessage('isready');
          $('evalLabel').textContent = 'STOCKFISH';
        }
        if (line === 'readyok' && evalQueue) {
          const fen = evalQueue;
          evalQueue = null;
          runEval(fen);
        }
        if (line.includes('score cp') && line.includes(' depth ')) {
          const depthMatch = line.match(/depth (\d+)/);
          const cpMatch = line.match(/score cp (-?\d+)/);
          if (depthMatch && cpMatch) {
            const depth = parseInt(depthMatch[1]);
            if (depth >= 8) {
              const cp = parseInt(cpMatch[1]);
              updateEvalBar(cp / 100);
            }
          }
        }
        if (line.includes('score mate')) {
          const mateMatch = line.match(/score mate (-?\d+)/);
          if (mateMatch) {
            const mateIn = parseInt(mateMatch[1]);
            updateEvalBar(mateIn > 0 ? 15 : -15, mateIn);
          }
        }
      };
      stockfish.postMessage('uci');
    })
    .catch(err => {
      console.log('Stockfish load failed, using positional eval:', err);
      sfFailed = true;
      $('evalLabel').textContent = 'EVAL';
    });
}

function requestEval(positionIndex) {
  const fen = engine.getFENAt(positionIndex);
  if (!fen) return;

  if (sfReady) {
    runEval(fen);
  } else if (sfFailed) {
    staticEvalFromFEN(positionIndex);
  } else {
    evalQueue = fen;
    staticEvalFromFEN(positionIndex);
  }
}

function runEval(fen) {
  $('evalLoading').style.display = 'block';
  stockfish.postMessage('stop');
  stockfish.postMessage('position fen ' + fen);
  stockfish.postMessage('go depth 14');
}

function updateEvalBar(evalScore, mateIn) {
  $('evalLoading').style.display = 'none';
  const clamped = Math.max(-10, Math.min(10, evalScore));
  const pct = 50 + (clamped / 10) * 50;
  $('evalWhite').style.height = pct + '%';

  const numEl = $('evalNumber');
  if (mateIn !== undefined) {
    numEl.textContent = mateIn > 0 ? `M${mateIn}` : `M${Math.abs(mateIn)}`;
    numEl.style.color = mateIn > 0 ? '#4ecdc4' : '#ff6b6b';
  } else {
    numEl.textContent = (evalScore >= 0 ? '+' : '') + evalScore.toFixed(1);
    numEl.style.color = evalScore > 0.5 ? '#4ecdc4' : evalScore < -0.5 ? '#ff6b6b' : '#aaa';
  }
}

// ============================================================
// STATIC POSITIONAL EVAL (fallback)
// ============================================================
function staticEvalFromFEN(positionIndex) {
  const board = engine.getPositionAt(positionIndex);
  if (!board) return;

  const pieceVals = { P: 1, N: 3.2, B: 3.3, R: 5, Q: 9, K: 0 };

  const pawnTable = [
    0, 0, 0, 0, 0, 0, 0, 0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
    5, 5, 10, 25, 25, 10, 5, 5,
    0, 0, 0, 20, 20, 0, 0, 0,
    5, -5, -10, 0, 0, -10, -5, 5,
    5, 10, 10, -20, -20, 10, 10, 5,
    0, 0, 0, 0, 0, 0, 0, 0,
  ];
  const knightTable = [
    -50, -40, -30, -30, -30, -30, -40, -50,
    -40, -20, 0, 0, 0, 0, -20, -40,
    -30, 0, 10, 15, 15, 10, 0, -30,
    -30, 5, 15, 20, 20, 15, 5, -30,
    -30, 0, 15, 20, 20, 15, 0, -30,
    -30, 5, 10, 15, 15, 10, 5, -30,
    -40, -20, 0, 5, 5, 0, -20, -40,
    -50, -40, -30, -30, -30, -30, -40, -50,
  ];
  const bishopTable = [
    -20, -10, -10, -10, -10, -10, -10, -20,
    -10, 0, 0, 0, 0, 0, 0, -10,
    -10, 0, 10, 10, 10, 10, 0, -10,
    -10, 5, 5, 10, 10, 5, 5, -10,
    -10, 0, 10, 10, 10, 10, 0, -10,
    -10, 10, 10, 10, 10, 10, 10, -10,
    -10, 5, 0, 0, 0, 0, 5, -10,
    -20, -10, -10, -10, -10, -10, -10, -20,
  ];
  const rookTable = [
    0, 0, 0, 0, 0, 0, 0, 0,
    5, 10, 10, 10, 10, 10, 10, 5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    -5, 0, 0, 0, 0, 0, 0, -5,
    0, 0, 0, 5, 5, 0, 0, 0,
  ];

  const tables = { P: pawnTable, N: knightTable, B: bishopTable, R: rookTable };

  let score = 0;
  let whiteBishops = 0, blackBishops = 0;
  let whiteDeveloped = 0, blackDeveloped = 0;
  let whiteKingCastled = false, blackKingCastled = false;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (!p) continue;
      const type = p.toUpperCase();
      const isWhite = p === type;
      const val = pieceVals[type] || 0;

      score += isWhite ? val : -val;

      const table = tables[type];
      if (table) {
        const idx = isWhite ? (r * 8 + c) : ((7 - r) * 8 + c);
        score += isWhite ? table[idx] * 0.01 : -table[idx] * 0.01;
      }

      if (type === 'B') { if (isWhite) whiteBishops++; else blackBishops++; }
      if (type === 'N' || type === 'B') {
        if (isWhite && r !== 7) whiteDeveloped++;
        if (!isWhite && r !== 0) blackDeveloped++;
      }
      if (type === 'K') {
        if (isWhite && r === 7 && (c === 6 || c === 1)) whiteKingCastled = true;
        if (!isWhite && r === 0 && (c === 6 || c === 1)) blackKingCastled = true;
      }
    }
  }

  if (whiteBishops >= 2) score += 0.25;
  if (blackBishops >= 2) score -= 0.25;
  score += (whiteDeveloped - blackDeveloped) * 0.12;
  if (whiteKingCastled) score += 0.3;
  if (blackKingCastled) score -= 0.3;

  // London-specific gradual advantage
  if (currentMoveIndex >= 0) {
    const moveNum = Math.floor(currentMoveIndex / 2) + 1;
    score += Math.min(0.4, moveNum * 0.04);
  }

  const evalInPawns = Math.round(score * 10) / 10;
  updateEvalBar(evalInPawns);
}

// ============================================================
// FEN GENERATOR (for Stockfish compatibility)
// ============================================================
function boardToFEN(board, isWhiteToMove) {
  let fen = '';
  for (let r = 0; r < 8; r++) {
    let empty = 0;
    for (let c = 0; c < 8; c++) {
      if (board[r][c]) {
        if (empty > 0) { fen += empty; empty = 0; }
        fen += board[r][c];
      } else {
        empty++;
      }
    }
    if (empty > 0) fen += empty;
    if (r < 7) fen += '/';
  }
  fen += isWhiteToMove ? ' w' : ' b';
  fen += ' KQkq - 0 1';
  return fen;
}

// ============================================================
// EVENT LISTENERS
// ============================================================
function setupEventListeners() {
  // Navigation buttons
  $('btnStart').addEventListener('click', goToStart);
  $('btnBack').addEventListener('click', goBack);
  $('btnForward').addEventListener('click', goForward);
  $('btnEnd').addEventListener('click', goToEnd);
  $('autoBtn').addEventListener('click', toggleAutoPlay);
  $('flipBtn').addEventListener('click', flipBoard);

  // Mode toggle
  $('studyModeBtn').addEventListener('click', () => setMode('study'));
  $('quizModeBtn').addEventListener('click', () => setMode('quiz'));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goForward(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goBack(); }
    if (e.key === 'Home') { e.preventDefault(); goToStart(); }
    if (e.key === 'End') { e.preventDefault(); goToEnd(); }
  });
}

// ============================================================
// INIT
// ============================================================
function init() {
  engine.reset();
  setupEventListeners();
  renderSidebar();
  renderBoard(engine.getPositionAt(0));
  initStockfish();
  updateEvalBar(0.3);
  validateOnStartup();
}

init();
