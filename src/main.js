import { GameEngine } from './engine.js';
import { LINES } from './data/repertoire.js';
import './styles.css';

const $ = id => document.getElementById(id);
const engine = new GameEngine();

// Piece map
const PIECES = {
  K: '\u2654', Q: '\u2655', R: '\u2656', B: '\u2657', N: '\u2658', P: '\u2659',
  k: '\u265A', q: '\u265B', r: '\u265C', b: '\u265D', n: '\u265E', p: '\u265F',
};
function isWhitePiece(p) { return p === p.toUpperCase(); }

// ============================================================
// STATE
// ============================================================
let currentLine = null;
let currentLineIndex = -1;
let currentMoveIndex = -1;
let flipped = false;
let autoPlaying = false;
let autoTimer = null;
let appMode = 'study'; // 'study' | 'quiz'

// Click-to-move / Drag state
let selectedSquare = null;
let legalTargets = [];
let dragging = false;
let dragPiece = null;
let dragFromRow = -1;
let dragFromCol = -1;

// Quiz state
let quizBoardActive = false;
let quizMoveCallback = null;
let quizScore = { correct: 0, wrong: 0, total: 0 };
let quizState = {};

// Streak & persistence
let streak = 0;
let bestStreak = 0;

// Stockfish
let stockfish = null;
let sfReady = false;
let evalQueue = null;
let sfFailed = false;

// Last move for arrow overlay
let lastMoveFrom = null;
let lastMoveTo = null;

// Auto-play black delay
const AUTO_BLACK_DELAY = 400;

// ============================================================
// SOUND EFFECTS (Web Audio API)
// ============================================================
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playSound(type) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case 'move':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
        break;
      case 'capture':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
        break;
      case 'check':
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.setValueAtTime(1000, ctx.currentTime + 0.05);
        osc.frequency.setValueAtTime(800, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
        break;
      case 'correct':
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523, ctx.currentTime);
        osc.frequency.setValueAtTime(659, ctx.currentTime + 0.1);
        osc.frequency.setValueAtTime(784, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
        break;
      case 'wrong':
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
        break;
    }
  } catch (e) { /* audio not available */ }
}

// ============================================================
// PERSISTENCE (localStorage)
// ============================================================
function loadStats() {
  try {
    const saved = JSON.parse(localStorage.getItem('london-trainer-stats'));
    if (saved) {
      quizScore = saved.quizScore || quizScore;
      bestStreak = saved.bestStreak || 0;
      streak = saved.streak || 0;
    }
  } catch (e) {}
}

function saveStats() {
  try {
    localStorage.setItem('london-trainer-stats', JSON.stringify({
      quizScore, bestStreak, streak
    }));
  } catch (e) {}
}

function updateStreakBar() {
  const el = $('streakBar');
  if (quizScore.total === 0) { el.innerHTML = ''; return; }
  el.innerHTML = `
    <span class="streak-fire">${streak >= 3 ? '\uD83D\uDD25' : '\u26A1'}</span>
    <span>Streak: <span class="streak-count">${streak}</span></span>
    <span>Best: <span class="streak-count">${bestStreak}</span></span>
    <span style="margin-left:auto; color:var(--text-muted)">${quizScore.correct}/${quizScore.total} (${Math.round(quizScore.correct / quizScore.total * 100)}%)</span>
  `;
}

// ============================================================
// TOAST
// ============================================================
function showToast(msg, duration = 2000) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), duration);
}

// ============================================================
// THEME TOGGLE
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('london-trainer-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('london-trainer-theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  $('themeToggle').textContent = theme === 'dark' ? '\u2600' : '\u263D';
}

// ============================================================
// VALIDATION
// ============================================================
function validateOnStartup() {
  const result = GameEngine.validateRepertoire(LINES);
  if (result.errors.length > 0) {
    console.warn(`Repertoire validation: ${result.errors.length} errors found`);
  }
}

// ============================================================
// SIDEBAR
// ============================================================
function renderSidebar() {
  const el = $('sidebar');
  let html = '';
  let lastSection = '';

  LINES.forEach((line, i) => {
    if (line.section && line.section !== lastSection) {
      html += `<div class="sidebar-section">${line.section}</div>`;
      lastSection = line.section;
    }
    const active = i === currentLineIndex ? 'active' : '';
    const freq = line.frequency ? `<span class="freq">${line.frequency}</span>` : '';
    html += `<button class="line-btn ${active}" data-idx="${i}">${line.name}${freq}</button>`;
  });
  el.innerHTML = html;

  el.querySelectorAll('.line-btn').forEach(btn => {
    btn.addEventListener('click', () => selectLine(parseInt(btn.dataset.idx)));
  });
}

// ============================================================
// BOARD RENDERER
// ============================================================
function renderBoard(board, animate = false) {
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

      // Interactive
      if (quizBoardActive || appMode === 'study') classes += ' interactive';

      // Drag source
      if (dragging && dragFromRow === displayR && dragFromCol === displayC) classes += ' dragging';

      const animClass = animate ? ' piece-animated' : '';
      html += `<div class="${classes}" data-row="${displayR}" data-col="${displayC}">${pieceChar ? `<span class="${pieceClass}${animClass}">${pieceChar}</span>` : ''}</div>`;
    }
  }
  el.innerHTML = html;

  // Attach click + drag handlers
  el.querySelectorAll('.square').forEach(sq => {
    const row = parseInt(sq.dataset.row);
    const col = parseInt(sq.dataset.col);

    sq.addEventListener('mousedown', (e) => handlePointerDown(e, row, col, board));
    sq.addEventListener('touchstart', (e) => handleTouchStart(e, row, col, board), { passive: false });
  });

  // Update arrow overlay
  drawArrow();
}

// ============================================================
// DRAG & DROP
// ============================================================
function handlePointerDown(e, row, col, board) {
  if (e.button !== 0) return;
  const piece = board[row][col];

  // Determine if we can interact
  if (appMode === 'quiz' && !quizBoardActive) return;
  if (appMode === 'study' && currentMoveIndex < 0 && !piece) return;

  // In study mode, only allow clicking forward (not actual piece movement)
  if (appMode === 'study') {
    boardClickStudy(row, col);
    return;
  }

  // Quiz mode: click or start drag
  if (!piece || !isWhitePiece(piece)) {
    // Clicking a target square with a selected piece
    if (selectedSquare) {
      boardClick(row, col);
    }
    return;
  }

  // Start drag for white piece in quiz mode
  const ghost = $('dragGhost');
  const pieceClass = isWhitePiece(piece) ? 'piece-white' : 'piece-black';
  ghost.innerHTML = `<span class="${pieceClass}">${PIECES[piece]}</span>`;
  ghost.style.display = 'block';
  ghost.style.left = e.clientX + 'px';
  ghost.style.top = e.clientY + 'px';

  dragging = true;
  dragPiece = piece;
  dragFromRow = row;
  dragFromCol = col;

  // Also select the square to show legal moves
  selectedSquare = [row, col];
  engine.loadPosition(currentMoveIndex + 1);
  legalTargets = getLegalTargetsForSquare(row, col);
  renderBoard(board);

  e.preventDefault();
}

function handleTouchStart(e, row, col, board) {
  if (appMode === 'study') { boardClickStudy(row, col); return; }
  if (!quizBoardActive) return;

  const piece = board[row][col];
  if (!piece || !isWhitePiece(piece)) {
    if (selectedSquare) boardClick(row, col);
    return;
  }

  const touch = e.touches[0];
  const ghost = $('dragGhost');
  const pieceClass = isWhitePiece(piece) ? 'piece-white' : 'piece-black';
  ghost.innerHTML = `<span class="${pieceClass}">${PIECES[piece]}</span>`;
  ghost.style.display = 'block';
  ghost.style.left = touch.clientX + 'px';
  ghost.style.top = (touch.clientY - 40) + 'px';

  dragging = true;
  dragPiece = piece;
  dragFromRow = row;
  dragFromCol = col;

  selectedSquare = [row, col];
  engine.loadPosition(currentMoveIndex + 1);
  legalTargets = getLegalTargetsForSquare(row, col);
  renderBoard(board);

  e.preventDefault();
}

function handlePointerMove(e) {
  if (!dragging) return;
  const ghost = $('dragGhost');
  const x = e.clientX || (e.touches && e.touches[0].clientX);
  const y = e.clientY || (e.touches && e.touches[0].clientY);
  if (x !== undefined) {
    ghost.style.left = x + 'px';
    ghost.style.top = (y - (e.touches ? 40 : 0)) + 'px';
  }
}

function handlePointerUp(e) {
  if (!dragging) return;
  const ghost = $('dragGhost');
  ghost.style.display = 'none';
  dragging = false;

  // Determine which square we dropped on
  const x = e.clientX || (e.changedTouches && e.changedTouches[0].clientX);
  const y = e.clientY || (e.changedTouches && e.changedTouches[0].clientY);

  const boardEl = $('board');
  const rect = boardEl.getBoundingClientRect();
  const sqSize = rect.width / 8;
  const relX = x - rect.left;
  const relY = y - rect.top;

  if (relX >= 0 && relX < rect.width && relY >= 0 && relY < rect.height) {
    let dropC = Math.floor(relX / sqSize);
    let dropR = Math.floor(relY / sqSize);
    if (flipped) { dropR = 7 - dropR; dropC = 7 - dropC; }

    // Try the move
    if (dropR !== dragFromRow || dropC !== dragFromCol) {
      selectedSquare = [dragFromRow, dragFromCol];
      boardClick(dropR, dropC);
      return;
    }
  }

  // Dropped outside or on same square: keep selection visible
  const posIdx = currentMoveIndex + 1;
  renderBoard(engine.getPositionAt(posIdx));
}

// Global mouse/touch move/up handlers
document.addEventListener('mousemove', handlePointerMove);
document.addEventListener('mouseup', handlePointerUp);
document.addEventListener('touchmove', handlePointerMove, { passive: false });
document.addEventListener('touchend', handlePointerUp);

// ============================================================
// BOARD CLICK — STUDY MODE (click to advance moves)
// ============================================================
function boardClickStudy(row, col) {
  // In study mode, clicking the board simply advances forward
  goForward();
}

// ============================================================
// BOARD CLICK — QUIZ MODE
// ============================================================
function boardClick(row, col) {
  if (!quizBoardActive || !currentLine) return;

  const posIdx = currentMoveIndex + 1;
  const board = engine.getPositionAt(posIdx);
  const piece = board[row][col];

  engine.loadPosition(posIdx);

  if (selectedSquare) {
    const [fromR, fromC] = selectedSquare;

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

    // Check legal target
    const isLegal = legalTargets.some(t => t[0] === row && t[1] === col);
    if (!isLegal) {
      selectedSquare = null;
      legalTargets = [];
      renderBoard(board);
      return;
    }

    const moveResult = engine.tryMove(fromR, fromC, row, col);
    selectedSquare = null;
    legalTargets = [];

    if (moveResult && quizMoveCallback) {
      // Determine sound
      if (moveResult.san.includes('+')) playSound('check');
      else if (moveResult.san.includes('x') || moveResult.captured) playSound('capture');
      else playSound('move');

      quizMoveCallback(moveResult.san, fromR, fromC, row, col);
    } else {
      renderBoard(board);
    }
  } else {
    // First click — select white piece
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
// MOVE ARROWS OVERLAY
// ============================================================
function drawArrow() {
  const svg = $('arrowOverlay');
  if (!svg) return;

  svg.innerHTML = '';
  if (currentMoveIndex < 0) return;

  const detail = engine.getMoveDetailAt(currentMoveIndex);
  if (!detail) return;

  const [fromR, fromC] = GameEngine.fromAlgebraic(detail.from);
  const [toR, toC] = GameEngine.fromAlgebraic(detail.to);

  // Convert to SVG coords (each square = 60px)
  const fR = flipped ? 7 - fromR : fromR;
  const fC = flipped ? 7 - fromC : fromC;
  const tR = flipped ? 7 - toR : toR;
  const tC = flipped ? 7 - toC : toC;

  const x1 = fC * 60 + 30;
  const y1 = fR * 60 + 30;
  const x2 = tC * 60 + 30;
  const y2 = tR * 60 + 30;

  // Draw arrow line
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  defs.innerHTML = `<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
    <polygon points="0 0, 10 3.5, 0 7" fill="rgba(233,69,96,0.7)" />
  </marker>`;
  svg.appendChild(defs);

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', 'rgba(233,69,96,0.5)');
  line.setAttribute('stroke-width', '6');
  line.setAttribute('marker-end', 'url(#arrowhead)');
  svg.appendChild(line);
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
    item.addEventListener('click', () => goToMove(parseInt(item.dataset.moveIdx)));
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
      html += `<span class="move-item white-move" style="color:var(--text-muted)">???</span>`;
      html += `<span class="move-item black-move" style="color:var(--text-muted)">???</span>`;
    } else {
      html += `<span class="move-item white-move ${wCurrent}" data-move-idx="${wIdx}">${cleanDisplay(m.w)}</span>`;
      html += `<span class="move-item black-move ${bCurrent}" data-move-idx="${bIdx}">${cleanDisplay(m.b)}</span>`;
    }
  });
  el.innerHTML = html;

  el.querySelectorAll('.move-item[data-move-idx]').forEach(item => {
    item.addEventListener('click', () => goToMove(parseInt(item.dataset.moveIdx)));
  });
}

function cleanDisplay(move) {
  return move.replace(/[\u2B50\u26A0\uFE0F]/g, '').trim();
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
      <div><span class="mistake-move">${m.move}</span> <span style="color:var(--text-muted)">(${m.atMove})</span></div>
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

function goToMove(idx, opts = {}) {
  if (!currentLine) return;
  const maxIdx = currentLine.moves.length * 2 - 1;
  const prevIdx = currentMoveIndex;
  currentMoveIndex = Math.max(-1, Math.min(idx, maxIdx));

  // Determine if this was a capture for sound
  const isNewMove = currentMoveIndex !== prevIdx;
  const animate = isNewMove && !opts.silent;

  if (isNewMove && !opts.silent && currentMoveIndex >= 0) {
    const detail = engine.getMoveDetailAt(currentMoveIndex);
    if (detail) {
      if (detail.san && detail.san.includes('+')) playSound('check');
      else if (detail.san && (detail.san.includes('x') || detail.captured)) playSound('capture');
      else playSound('move');
    }
  }

  renderBoard(engine.getPositionAt(currentMoveIndex + 1), animate);
  if (appMode !== 'quiz') renderMoveList();
  renderCommentary();
  requestEval(currentMoveIndex + 1);
}

function goToStart() { stopAutoPlay(); goToMove(-1, { silent: true }); }
function goBack() { stopAutoPlay(); goToMove(currentMoveIndex - 1); }
function goForward() {
  if (!currentLine) return;
  const maxIdx = currentLine.moves.length * 2 - 1;
  if (currentMoveIndex >= maxIdx) return;

  goToMove(currentMoveIndex + 1);

  // Auto-play Black's response in study mode
  if (appMode === 'study' && !autoPlaying) {
    const isWhiteJustPlayed = currentMoveIndex % 2 === 0;
    if (isWhiteJustPlayed && currentMoveIndex < maxIdx) {
      setTimeout(() => {
        if (appMode === 'study' && !autoPlaying) {
          goToMove(currentMoveIndex + 1);
        }
      }, AUTO_BLACK_DELAY);
    }
  }
}
function goToEnd() { stopAutoPlay(); if (currentLine) goToMove(currentLine.moves.length * 2 - 1, { silent: true }); }

function flipBoard() {
  flipped = !flipped;
  const board = currentLine ? engine.getPositionAt(currentMoveIndex + 1) : engine.getPositionAt(0);
  renderBoard(board);
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
  goToMove(currentMoveIndex + 1);
  autoTimer = setTimeout(autoStep, 1000);
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
  updateStreakBar();
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

  quizBoardActive = true;
  selectedSquare = null;
  legalTargets = [];

  engine.loadPosition(currentMoveIndex + 1);
  renderBoard(engine.getPositionAt(currentMoveIndex + 1));
  renderQuizMoveList(moveIdx);

  const correctMove = engine.cleanNotation(line.moves[moveIdx].w);
  const distractors = generateDistractors(correctMove);
  const options = shuffle([correctMove, ...distractors]);

  quizState = { lineIdx: globalIdx, moveIdx, answered: false, correctMove };

  quizMoveCallback = function (san) {
    if (quizState.answered) return;
    const normPlayer = normalizeNotation(san);
    const normCorrect = normalizeNotation(correctMove);
    handleQuizAnswer(normPlayer === normCorrect, san, correctMove);
  };

  $('boardPrompt').innerHTML = '<div class="quiz-board-prompt">Click or drag a white piece to move it \u2014 or use the buttons below</div>';

  const moveNum = moveIdx + 1;
  let html = `<div class="quiz-panel">
    <h3>\uD83E\uDDE0 What's White's Move?</h3>
    <div class="quiz-score" id="quizScoreDisplay">
      <span class="quiz-score-item quiz-score-correct">\u2713 ${quizScore.correct}</span>
      <span class="quiz-score-item quiz-score-wrong">\u2717 ${quizScore.wrong}</span>
      <span class="quiz-score-item quiz-score-total">${quizScore.total} total</span>
      ${quizScore.total > 0 ? `<span class="quiz-score-item" style="color:var(--text-muted)">(${Math.round(quizScore.correct / quizScore.total * 100)}%)</span>` : ''}
    </div>
    <div class="quiz-prompt">
      <strong>${line.name}</strong><br>
      Move <strong>${moveNum}</strong> \u2014 Move a piece on the board or click a button:
    </div>
    <div class="quiz-options" id="quizOptions"></div>
    <div id="quizResult"></div>
  </div>`;
  $('quizPanel').innerHTML = html;

  const optContainer = $('quizOptions');
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = opt;
    btn.addEventListener('click', () => quizAnswer(opt, btn));
    optContainer.appendChild(btn);
  });

  $('commentary').innerHTML = `<strong>Quiz:</strong> ${line.name}<br>Move ${moveNum} \u2014 Move a piece on the board!`;
  updateStreakBar();
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

  document.querySelectorAll('.quiz-opt').forEach(btn => {
    if (normalizeNotation(btn.textContent) === normalizeNotation(correctMove)) {
      btn.classList.add('correct');
    }
  });

  if (isCorrect) {
    quizScore.correct++;
    streak++;
    if (streak > bestStreak) bestStreak = streak;
    playSound('correct');
    $('boardPrompt').innerHTML = `<div class="quiz-board-prompt correct">\u2713 Correct! ${correctMove}${streak >= 3 ? ' \uD83D\uDD25' + streak : ''}</div>`;
    $('quizResult').innerHTML = `
      <div class="quiz-result correct-result">
        <strong>\u2713 Correct!</strong> ${moveData.wComment}
      </div>
      <button class="quiz-next-btn" id="quizNextBtn">Next Question \u2192</button>`;
  } else {
    quizScore.wrong++;
    streak = 0;
    playSound('wrong');
    $('boardPrompt').innerHTML = `<div class="quiz-board-prompt wrong">\u2717 You played ${playerMove} \u2014 correct was ${correctMove}</div>`;
    $('quizResult').innerHTML = `
      <div class="quiz-result wrong-result">
        <strong>\u2717 The correct move was ${correctMove}</strong><br>${moveData.wComment}
      </div>
      <button class="quiz-next-btn" id="quizNextBtn">Next Question \u2192</button>`;
  }

  saveStats();
  updateStreakBar();

  $('quizNextBtn').addEventListener('click', generateQuizQuestion);

  const correctIdx = quizState.moveIdx * 2;
  currentMoveIndex = correctIdx;
  renderBoard(engine.getPositionAt(currentMoveIndex + 1), true);

  $('quizScoreDisplay').innerHTML = `
    <span class="quiz-score-item quiz-score-correct">\u2713 ${quizScore.correct}</span>
    <span class="quiz-score-item quiz-score-wrong">\u2717 ${quizScore.wrong}</span>
    <span class="quiz-score-item quiz-score-total">${quizScore.total} total</span>
    ${quizScore.total > 0 ? `<span class="quiz-score-item" style="color:var(--text-muted)">(${Math.round(quizScore.correct / quizScore.total * 100)}%)</span>` : ''}`;
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
  return shuffle(filtered).slice(0, 3);
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
// PGN EXPORT
// ============================================================
function exportPGN() {
  if (!currentLine) { showToast('Select a line first'); return; }

  let pgn = `[Event "London System Training"]\n`;
  pgn += `[Site "London System Trainer"]\n`;
  pgn += `[Date "${new Date().toISOString().slice(0, 10)}"]\n`;
  pgn += `[White "Student"]\n`;
  pgn += `[Black "Opponent"]\n`;
  pgn += `[Opening "${currentLine.name}"]\n`;
  pgn += `[Result "*"]\n\n`;

  currentLine.moves.forEach((m, i) => {
    pgn += `${i + 1}. ${cleanDisplay(m.w)} ${cleanDisplay(m.b)} `;
  });
  pgn += '*';

  navigator.clipboard.writeText(pgn).then(() => {
    showToast('PGN copied to clipboard!');
  }).catch(() => {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = pgn;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('PGN copied to clipboard!');
  });
}

// ============================================================
// SHARE POSITION
// ============================================================
function sharePosition() {
  if (!currentLine) { showToast('Select a line first'); return; }
  const params = new URLSearchParams({
    line: currentLineIndex,
    move: currentMoveIndex
  });
  const url = window.location.origin + window.location.pathname + '?' + params.toString();
  navigator.clipboard.writeText(url).then(() => {
    showToast('Position link copied!');
  }).catch(() => {
    showToast('Position link copied!');
  });
}

function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const lineIdx = params.get('line');
  const moveIdx = params.get('move');
  if (lineIdx !== null && LINES[parseInt(lineIdx)]) {
    selectLine(parseInt(lineIdx));
    if (moveIdx !== null) {
      goToMove(parseInt(moveIdx), { silent: true });
    }
    return true;
  }
  return false;
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
  if (sfReady) runEval(fen);
  else if (sfFailed) staticEvalFromFEN(positionIndex);
  else { evalQueue = fen; staticEvalFromFEN(positionIndex); }
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
    numEl.style.color = mateIn > 0 ? 'var(--accent-teal)' : 'var(--accent-red)';
  } else {
    numEl.textContent = (evalScore >= 0 ? '+' : '') + evalScore.toFixed(1);
    numEl.style.color = evalScore > 0.5 ? 'var(--accent-teal)' : evalScore < -0.5 ? 'var(--accent-red)' : 'var(--text-muted)';
  }
}

// ============================================================
// STATIC POSITIONAL EVAL (fallback)
// ============================================================
function staticEvalFromFEN(positionIndex) {
  const board = engine.getPositionAt(positionIndex);
  if (!board) return;

  const pieceVals = { P: 1, N: 3.2, B: 3.3, R: 5, Q: 9, K: 0 };
  const pawnTable = [0,0,0,0,0,0,0,0,50,50,50,50,50,50,50,50,10,10,20,30,30,20,10,10,5,5,10,25,25,10,5,5,0,0,0,20,20,0,0,0,5,-5,-10,0,0,-10,-5,5,5,10,10,-20,-20,10,10,5,0,0,0,0,0,0,0,0];
  const knightTable = [-50,-40,-30,-30,-30,-30,-40,-50,-40,-20,0,0,0,0,-20,-40,-30,0,10,15,15,10,0,-30,-30,5,15,20,20,15,5,-30,-30,0,15,20,20,15,0,-30,-30,5,10,15,15,10,5,-30,-40,-20,0,5,5,0,-20,-40,-50,-40,-30,-30,-30,-30,-40,-50];
  const bishopTable = [-20,-10,-10,-10,-10,-10,-10,-20,-10,0,0,0,0,0,0,-10,-10,0,10,10,10,10,0,-10,-10,5,5,10,10,5,5,-10,-10,0,10,10,10,10,0,-10,-10,10,10,10,10,10,10,-10,-10,5,0,0,0,0,5,-10,-20,-10,-10,-10,-10,-10,-10,-20];
  const rookTable = [0,0,0,0,0,0,0,0,5,10,10,10,10,10,10,5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,-5,0,0,0,0,0,0,-5,0,0,0,5,5,0,0,0];
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
  if (currentMoveIndex >= 0) {
    const moveNum = Math.floor(currentMoveIndex / 2) + 1;
    score += Math.min(0.4, moveNum * 0.04);
  }

  updateEvalBar(Math.round(score * 10) / 10);
}

// ============================================================
// EVENT LISTENERS
// ============================================================
function setupEventListeners() {
  $('btnStart').addEventListener('click', goToStart);
  $('btnBack').addEventListener('click', goBack);
  $('btnForward').addEventListener('click', goForward);
  $('btnEnd').addEventListener('click', goToEnd);
  $('autoBtn').addEventListener('click', toggleAutoPlay);
  $('flipBtn').addEventListener('click', flipBoard);

  $('studyModeBtn').addEventListener('click', () => setMode('study'));
  $('quizModeBtn').addEventListener('click', () => setMode('quiz'));

  $('themeToggle').addEventListener('click', toggleTheme);
  $('pgnExportBtn').addEventListener('click', exportPGN);
  $('shareBtn').addEventListener('click', sharePosition);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goForward(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goBack(); }
    if (e.key === 'Home') { e.preventDefault(); goToStart(); }
    if (e.key === 'End') { e.preventDefault(); goToEnd(); }
    if (e.key === 'f' || e.key === 'F') { flipBoard(); }
  });
}

// ============================================================
// INIT
// ============================================================
function init() {
  initTheme();
  loadStats();
  engine.reset();
  setupEventListeners();
  renderSidebar();
  renderBoard(engine.getPositionAt(0));
  initStockfish();
  updateEvalBar(0.3);
  updateStreakBar();

  // Validate repertoire (non-blocking)
  try { validateOnStartup(); } catch (e) { console.warn('Validation error:', e); }

  // Load from URL params or auto-select first line
  // Use setTimeout to ensure DOM is fully ready
  setTimeout(() => {
    try {
      if (!loadFromURL()) {
        if (LINES.length > 0) selectLine(0);
      }
    } catch (e) {
      console.error('Line select error:', e);
    }
  }, 0);
}

init();
