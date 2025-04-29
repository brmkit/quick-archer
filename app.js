
let currentvol = [];
let volSize = 3;

const scoreValues = [
  { label: 'X', value: 10, color: 'yellow' },
  { label: '10', value: 10, color: 'yellow' },
  { label: '9', value: 9, color: 'yellow' },
  { label: '8', value: 8, color: 'red' },
  { label: '7', value: 7, color: 'red' },
  { label: '6', value: 6, color: 'blue' },
  { label: '5', value: 5, color: 'blue' },
  { label: '4', value: 4, color: 'black' },
  { label: '3', value: 3, color: 'black' },
  { label: '2', value: 2, color: 'white' },
  { label: '1', value: 1, color: 'white' },
  { label: 'M', value: 0, color: 'gray' }
];

document.getElementsByName('vol-size').forEach(radio => {
  radio.addEventListener('change', (e) => {
    volSize = parseInt(e.target.value);
    resetSession();
  });
});

document.getElementById('clear-session').addEventListener('click', () => {
  if (confirm('reset session?')) {
    resetSession();
  }
});

document.getElementById('undo-last').addEventListener('click', () => {
  undoLast();
});

function setupScorePad() {
  const pad = document.getElementById('score-pad');
  pad.innerHTML = '';
  scoreValues.forEach(score => {
    const button = document.createElement('button');
    button.textContent = score.label;
    button.classList.add('score-button', score.color);
    button.addEventListener('click', () => addScore(score));
    pad.appendChild(button);
  });
}

function addScore(score) {
  if (currentvol.length >= volSize) {
    alert('completed - reset session');
    return;
  }

  currentvol.push(score);
  updateDisplayGrid();
  updateSummary();
  updatevolInfo();
}

function undoLast() {
  currentvol.pop();
  updateDisplayGrid();
  updateSummary();
  updatevolInfo();
}

function resetSession() {
  currentvol = [];
  updateDisplayGrid();
  updateSummary();
  updatevolInfo();
}

function updateDisplayGrid() {
  const display = document.getElementById('score-display');
  display.innerHTML = '';
  display.className = volSize === 3 ? 'score-display three' : 'score-display six';

  for (let i = 0; i < volSize; i++) {
    const cell = document.createElement('div');
    cell.className = 'score-cell';
    cell.textContent = currentvol[i]?.label || '';
    display.appendChild(cell);
  }
}

function updateSummary() {
  const partial = currentvol.reduce((sum, s) => sum + s.value, 0);
  const count10 = currentvol.filter(s => s.label === 'X' || s.label === '10').length;
  const countX = currentvol.filter(s => s.label === 'X').length;

  document.getElementById('partial-score').textContent = partial;
  document.getElementById('count-10x').textContent = count10;
  document.getElementById('count-x').textContent = countX;
}

function updatevolInfo() {
  document.getElementById('vol-info').textContent = `Volée ${currentvol.length}/${volSize}`;
}

setupScorePad();
resetSession();
