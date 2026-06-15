const Speech = (() => {
  let voice = null;
  let enabled = true;

  function init() {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }
    loadVoice();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoice;
    }
  }

  function loadVoice() {
    const voices = speechSynthesis.getVoices();
    voice = voices.find(v => v.lang === CONFIG.SPEECH.PREFERRED_LANG && v.name.includes('Google'))
         || voices.find(v => v.lang === CONFIG.SPEECH.PREFERRED_LANG)
         || voices.find(v => v.lang.startsWith('en'))
         || voices[0];
  }

  function speak(text) {
    if (!enabled || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.rate = CONFIG.SPEECH.RATE;
    utterance.pitch = CONFIG.SPEECH.PITCH;
    utterance.volume = CONFIG.SPEECH.VOLUME;
    speechSynthesis.speak(utterance);
  }

  function announceBall(letter, number) {
    speak(`${letter}. ${number}. ${letter} ${number}.`);
  }

  function setEnabled(value) {
    enabled = value;
    if (!enabled) speechSynthesis.cancel();
  }

  return { init, speak, announceBall, setEnabled };
})();