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
    els.ballLetter.textContent = ball.letter;
    els.ballNumber.textContent = ball.number;

    // Remove any previous letter color classes 
    els.currentBall.classList.remove('letter-B', 'letter-I', 'letter-N', 'letter-G', 'letter-O');
    // Add the new one based on the called letter
    els.currentBall.classList.add(`letter-${ball.letter}`);

    els.currentBall.classList.remove('animate');
    void els.currentBall.offsetWidth;
    els.currentBall.classList.add('animate');

    const cell = document.querySelector(`.board-cell[data-number="${ball.number}"]`);
    if (cell) {
        cell.classList.add('called', 'just-called');
        setTimeout(() => cell.classList.remove('just-called'), 600);
     }
    }

function updatePreviousCalls() {
  const called = Bingo.getCalled();
  const previous = called.slice(0, -1).slice(-CONFIG.PREVIOUS_CALLS_LIMIT).reverse();
  els.previousCalls.innerHTML = '';
  previous.forEach(ball => {
    const div = document.createElement('div');
    div.className = `previous-ball letter-${ball.letter}`;
    div.textContent = `${ball.letter}${ball.number}`;
    els.previousCalls.appendChild(div);
  });
}

  function updateStats() {
    els.calledCount.textContent = Bingo.getCalledCount();
    els.remainingCount.textContent = Bingo.getRemaining();
  }

 function resetDisplay() {
  els.ballLetter.textContent = '';
  els.ballNumber.textContent = '–';
  els.previousCalls.innerHTML = '';
  els.currentBall.classList.remove('letter-B', 'letter-I', 'letter-N', 'letter-G', 'letter-O');
  document.querySelectorAll('.board-cell').forEach(c => c.classList.remove('called', 'just-called'));
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