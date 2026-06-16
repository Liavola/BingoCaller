const UI = (() => {
  const els = {};

  function init() {
    els.ballLetter = document.getElementById('ballLetter');
    els.ballNumber = document.getElementById('ballNumber');
    els.currentBall = document.getElementById('currentBall');
    els.previousCalls = document.getElementById('previousCalls');
    els.calledCount = document.getElementById('calledCount');
    els.remainingCount = document.getElementById('remainingCount');
    els.callBtn = document.getElementById('callBtn');
    els.autoBtn = document.getElementById('autoBtn');
    els.resetBtn = document.getElementById('resetBtn');
    els.intervalSlider = document.getElementById('intervalSlider');
    els.intervalValue = document.getElementById('intervalValue');
    els.voiceToggle = document.getElementById('voiceToggle');

    buildBoard();
  }

  function buildBoard() {
    document.querySelectorAll('.board-column').forEach(col => {
      const letter = col.dataset.letter;
      const [min, max] = CONFIG.RANGES[letter];
      for (let n = min; n <= max; n++) {
        const cell = document.createElement('div');
        cell.className = 'board-cell';
        cell.dataset.number = n;
        cell.textContent = n;
        col.appendChild(cell);
      }
    });
  }

  function displayBall(ball) {
  // Update alle 4 kanten
  [1, 2, 3, 4].forEach(i => {
    document.getElementById(`ballLetter${i}`).textContent = ball.letter;
    document.getElementById(`ballNumber${i}`).textContent = ball.number;
  });

  // Kleur wisselen
  els.currentBall.classList.remove('letter-B','letter-I','letter-N','letter-G','letter-O');
  els.currentBall.classList.add(`letter-${ball.letter}`);

  // Animatie reset
  els.currentBall.classList.remove('animate');
  void els.currentBall.offsetWidth;
  els.currentBall.classList.add('animate');

  // Board cel markeren
  const cell = document.querySelector(`.board-cell[data-number="${ball.number}"]`);
  if (cell) {
    cell.classList.add('called', 'just-called');
    setTimeout(() => cell.classList.remove('just-called'), 600);
  }
}

function updatePreviousCalls() {
  const called = Bingo.getCalled();
  const previous = called.slice(0, -1).slice(-CONFIG.PREVIOUS_CALLS_LIMIT).reverse();

  // Get the currently displayed ball numbers
  const existingNumbers = Array.from(els.previousCalls.children).map(
    el => parseInt(el.dataset.number)
  );
  const newFirst = previous[0];
  const isNewBall = newFirst && !existingNumbers.includes(newFirst.number);

  els.previousCalls.innerHTML = '';
  previous.forEach((ball, index) => {
    const div = document.createElement('div');
    div.className = `previous-ball letter-${ball.letter}`;
    div.dataset.number = ball.number;
    div.textContent = `${ball.letter}${ball.number}`;

    if (isNewBall) {
      if (index === 0) {
        div.classList.add('rolling-in');
      } else {
        div.classList.add('shifting');
      }
    }

    els.previousCalls.appendChild(div);
  });
}

  function updateStats() {
    els.calledCount.textContent = Bingo.getCalledCount();
    els.remainingCount.textContent = Bingo.getRemaining();
  }

function resetDisplay() {
  [1, 2, 3, 4].forEach(i => {
    document.getElementById(`ballLetter${i}`).textContent = '';
    document.getElementById(`ballNumber${i}`).textContent = '–';
  });
  els.previousCalls.innerHTML = '';
  els.currentBall.classList.remove('letter-B','letter-I','letter-N','letter-G','letter-O');
  document.querySelectorAll('.board-cell')
    .forEach(c => c.classList.remove('called', 'just-called'));
  updateStats();
}

  function setAutoButtonText(running) {
    els.autoBtn.textContent = running ? 'Stop Automatisch' : 'Start Automatisch';
  }

  function setCallButtonEnabled(enabled) {
    els.callBtn.disabled = !enabled;
  }

  return {
    init, els, displayBall, updatePreviousCalls, updateStats,
    resetDisplay, setAutoButtonText, setCallButtonEnabled
  };
})();