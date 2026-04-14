const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

let wordLen = 0, matrix = [], selections = [], roundNum = 0, totalRounds = 0;
let selectedLen = 4;

function changeLen(delta) {
  selectedLen = Math.min(5, Math.max(2, selectedLen + delta));
  document.getElementById('len-display').textContent = selectedLen;
  document.getElementById('btn-minus').disabled = selectedLen === 2;
  document.getElementById('btn-plus').disabled  = selectedLen === 5;
}

// inicializa estado dos botões
document.getElementById('btn-minus').disabled = false;
document.getElementById('btn-plus').disabled  = false;

function buildInitialMatrix() {
  const rows = [];
  for (let i = 0; i < ALPHABET.length; i += 5)
    rows.push(ALPHABET.slice(i, i + 5));
  return rows;
}

function numCols(mat) { return Math.max(...mat.map(r => r.length)); }
function getColumn(mat, c) { return mat.map(row => row[c]).filter(l => l !== undefined); }
function buildNextMatrix(mat, sels) { return sels.map(c => getColumn(mat, c)); }
function getDiagonal(mat) { return mat.map((row, i) => row[i] ?? null); }

function startGame() {
  wordLen = selectedLen;
  matrix = buildInitialMatrix();
  selections = new Array(wordLen).fill(null);
  roundNum = 1;
  totalRounds = wordLen;
  show('setup-panel', false);
  show('win-panel', false);
  show('game-panel', true);
  renderProgress();
  renderRound();
}

function confirmRound() {
  const next = buildNextMatrix(matrix, selections);
  if (roundNum === totalRounds) {
    showWin(getDiagonal(next));
    return;
  }
  matrix = next;
  roundNum++;
  selections = new Array(wordLen).fill(null);
  renderProgress();
  renderRound();
}

function resetGame() {
  show('game-panel', false);
  show('win-panel', false);
  show('setup-panel', true);
}

function pickCol(colIdx) {
  const curr = selections.findIndex(v => v === null);
  if (curr === -1) return;
  selections[curr] = colIdx;
  document.getElementById('sel-box').innerHTML = renderSelsHTML();
  document.getElementById('confirm-btn').disabled = !selections.every(v => v !== null);
}

function renderProgress() {
  const row = document.getElementById('progress-row');
  row.innerHTML = '';
  for (let r = 1; r <= totalRounds; r++) {
    const s = document.createElement('div');
    s.className = 'progress-step' + (r < roundNum ? ' done' : r === roundNum ? ' active' : '');
    s.textContent = `${r}ª rodada`;
    row.appendChild(s);
  }
}

function renderRound() {
  const nc = numCols(matrix);
  const isLast = roundNum === totalRounds;
  document.getElementById('round-content').innerHTML = `
    <div class="fade-up">
      <span class="round-badge">${roundNum}ª Matriz ${isLast ? '— Última!' : ''}</span>
      <div class="card" style="padding:16px; overflow-x:auto;">${renderMatrixHTML(matrix)}</div>
      <p class="instr">Selecione a coluna de cada letra <strong>(em ordem: letra 1, letra 2...)</strong>:</p>
      <div class="sel-box" id="sel-box">${renderSelsHTML()}</div>
      <div class="col-btns">
        ${Array.from({length: nc}, (_, i) => `<button class="col-btn" onclick="pickCol(${i})">Col ${i+1}</button>`).join('')}
      </div>
      <button class="btn green" id="confirm-btn" onclick="confirmRound()">
        ${isLast ? '🔍 Revelar palavra →' : 'Confirmar → próxima matriz'}
      </button>
    </div>`;
  document.getElementById('confirm-btn').disabled = true;
}

function renderMatrixHTML(mat) {
  const nc = numCols(mat);
  let h = '<table class="matrix-table"><thead><tr>';
  for (let c = 0; c < nc; c++) h += `<th>Col ${c+1}</th>`;
  h += '</tr></thead><tbody>';
  mat.forEach((row, ri) => {
    h += '<tr>';
    for (let c = 0; c < nc; c++) {
      const l = row[c] ?? '';
      h += `<td class="${c === ri && l ? 'diag' : ''}">${l}</td>`;
    }
    h += '</tr>';
  });
  return h + '</tbody></table>';
}

function renderSelsHTML() {
  return Array.from({length: wordLen}, (_, i) => {
    const done   = selections[i] !== null;
    const active = !done && selections.slice(0, i).every(v => v !== null);
    const cls    = done ? 'done' : active ? 'active' : 'pending';
    const val    = done ? `Coluna ${selections[i]+1}` : active ? '← selecione agora' : '...';
    return `<div class="sel-row"><span class="sel-label">Letra ${i+1}:</span><span class="sel-val ${cls}">${val}</span></div>`;
  }).join('');
}

function showWin(word) {
  show('game-panel', false);
  const wr = document.getElementById('win-word-row');
  wr.innerHTML = '';
  word.forEach(l => {
    const s = document.createElement('div');
    s.className = 'wslot';
    s.textContent = l ?? '?';
    wr.appendChild(s);
  });
  show('win-panel', true);
}

function show(id, v) { document.getElementById(id).style.display = v ? 'block' : 'none'; }
