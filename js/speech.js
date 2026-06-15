const Speech = (() => {
  let voice = null;
  let enabled = true;

  function init() {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis niet ondersteund');
      return;
    }
    loadVoice();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoice;
    }
  }

  function loadVoice() {
    const voices = speechSynthesis.getVoices();
    voice = voices.find(v => v.lang === 'nl-NL' && v.name.toLowerCase().includes('google'))
         || voices.find(v => v.lang === 'nl-NL')
         || voices.find(v => v.lang.startsWith('nl'))
         || voices[0];
    if (voice) console.log('Stem:', voice.name, voice.lang);
  }

  function speak(text) {
    if (!enabled || !('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.lang = 'nl-NL';
    utterance.rate = CONFIG.SPEECH.RATE;
    utterance.pitch = CONFIG.SPEECH.PITCH;
    utterance.volume = CONFIG.SPEECH.VOLUME;
    speechSynthesis.speak(utterance);
  }

  function announceBall(letter, number) {
    speak(`${number}`);
  }

  function setEnabled(value) {
    enabled = value;
    if (!enabled) speechSynthesis.cancel();
  }

  return { init, speak, announceBall, setEnabled };
})();