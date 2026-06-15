const Bingo = (() => {
  let remaining = [];
  let called = [];

  function init() {
    remaining = [];
    called = [];
    for (let i = 1; i <= CONFIG.TOTAL_BALLS; i++) {
      remaining.push(i);
    }
    shuffle(remaining);
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  function callNext() {
    if (remaining.length === 0) return null;
    const number = remaining.pop();
    const letter = getLetterForNumber(number);
    const ball = { letter, number };
    called.push(ball);
    return ball;
  }

  function getCalled() { return [...called]; }
  function getRemaining() { return remaining.length; }
  function getCalledCount() { return called.length; }
  function isFinished() { return remaining.length === 0; }
  function reset() { init(); }

  return { init, callNext, getCalled, getRemaining, getCalledCount, isFinished, reset };
})();