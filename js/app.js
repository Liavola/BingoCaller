const App = (() => {
  let autoTimer = null;
  let autoRunning = false;
  let intervalSeconds = CONFIG.DEFAULT_INTERVAL;

  function init() {
    UI.init();
    Speech.init();
    Bingo.init();
    bindEvents();
    UI.updateStats();

  // Start muziek bij eerste klik
  const bgMusic = document.getElementById('bgMusic');
  bgMusic.volume = 0.2;  // zacht op de achtergrond

  document.addEventListener('click', () => {
    bgMusic.play().catch(e => console.log('Audio blocked:', e));
  }, { once: true });  // only triggers once
  }

  function bindEvents() {
    UI.els.callBtn.addEventListener('click', callNext);
    UI.els.autoBtn.addEventListener('click', toggleAuto);
    UI.els.resetBtn.addEventListener('click', reset);

    UI.els.intervalSlider.addEventListener('input', (e) => {
      intervalSeconds = parseFloat(e.target.value);
      UI.els.intervalValue.textContent = intervalSeconds.toFixed(1);
      if (autoRunning) {
        stopAuto();
        startAuto();
      }
    });

    UI.els.voiceToggle.addEventListener('change', (e) => {
      Speech.setEnabled(e.target.checked);
    });

    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.code === 'Space') {
        e.preventDefault();
        callNext();
      } else if (e.code === 'KeyA') {
        toggleAuto();
      } else if (e.code === 'KeyR') {
        reset();
      }
    });
  }

  function callNext() {
    if (Bingo.isFinished()) {
      stopAuto();
      UI.setCallButtonEnabled(false);
      Speech.speak('Alle nummers zijn gevallen. Bingo!');
      return;
    }
    const ball = Bingo.callNext();
    if (ball) {
      UI.displayBall(ball);
      UI.updatePreviousCalls();
      UI.updateStats();
      Speech.announceBall(ball.letter, ball.number);
    }
    if (Bingo.isFinished()) {
      stopAuto();
      UI.setCallButtonEnabled(false);
    }
  }

  function startAuto() {
    if (autoRunning || Bingo.isFinished()) return;
    autoRunning = true;
    UI.setAutoButtonText(true);
    callNext();
    autoTimer = setInterval(callNext, intervalSeconds * 1000);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
    autoRunning = false;
    UI.setAutoButtonText(false);
  }

  function toggleAuto() {
    if (autoRunning) stopAuto();
    else startAuto();
  }

  function reset() {
    stopAuto();
    Bingo.reset();
    UI.resetDisplay();
    UI.setCallButtonEnabled(true);
  }

  document.addEventListener('DOMContentLoaded', init);

  return { init };
})();