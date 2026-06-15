const CONFIG = {
  TOTAL_BALLS: 75,
  LETTERS: ['B', 'I', 'N', 'G', 'O'],
  RANGES: {
    B: [1, 15],
    I: [16, 30],
    N: [31, 45],
    G: [46, 60],
    O: [61, 75]
  },
  DEFAULT_INTERVAL: 3.0,
  MIN_INTERVAL: 1.0,
  MAX_INTERVAL: 15.0,
  PREVIOUS_CALLS_LIMIT: 8,
  SPEECH: {
    RATE: 0.95,
    PITCH: 1.0,
    VOLUME: 1.0,
    PREFERRED_LANG: 'nl-NL'
  }
};

// Dutch letter pronunciation (phonetic) so speech engines say it correctly
const LETTER_PRONUNCIATION = {
  B: 'Bee',
  I: 'Ie',
  N: 'En',
  G: 'Gee',
  O: 'Oo'
};

function getLetterForNumber(num) {
  for (const letter of CONFIG.LETTERS) {
    const [min, max] = CONFIG.RANGES[letter];
    if (num >= min && num <= max) return letter;
  }
  return '';
}