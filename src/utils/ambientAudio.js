// Luxury Salon Ambient Sound Generator using Web Audio API
// Generates a subtle, relaxing harmonic acoustic frequency chord (warm lounge atmosphere)
class AmbientSoundscape {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.oscillators = [];
    this.isPlaying = false;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);

    // Warm filter for soft acoustic feel
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(480, this.ctx.currentTime);

    this.masterGain.connect(filter);
    filter.connect(this.ctx.destination);
  }

  async start(volume = 0.25) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      try {
        await this.ctx.resume();
      } catch (e) {
        console.warn('AudioContext resume error:', e);
      }
    }
    if (this.isPlaying) return;

    // Harmonic chord frequencies (warm Fmaj9 chord: F2, C3, A3, E4)
    const freqs = [87.31, 130.81, 220.0, 329.63];
    this.oscillators = freqs.map((f, i) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, this.ctx.currentTime);
      
      // Gentle subtle detune for warm shimmer
      osc.detune.setValueAtTime((i - 1.5) * 4, this.ctx.currentTime);
      
      oscGain.gain.setValueAtTime(0.05 / (i + 1), this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.masterGain);
      try {
        osc.start();
      } catch (e) {}
      return osc;
    });

    // Gentle fade in
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(Math.max(0.001, volume), this.ctx.currentTime + 1.2);
    this.isPlaying = true;
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);
    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try { osc.stop(); osc.disconnect(); } catch (e) {}
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 700);
  }

  setVolume(vol) {
    if (!this.ctx || !this.masterGain) return;
    this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime + 0.2);
  }
}

export const ambientSound = new AmbientSoundscape();
