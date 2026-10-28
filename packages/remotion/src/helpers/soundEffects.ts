/**
 * Pure TypeScript Offline Procedural Sound Effect Generator (WAV Data URIs)
 * Generates zero-dependency PCM audio for Remotion <Audio /> and Web Audio
 */

function createWavDataUri(sampleRate: number, duration: number, generator: (t: number) => number): string {
  const numSamples = Math.floor(sampleRate * duration);
  const buffer = new ArrayBuffer(44 + numSamples * 2);
  const view = new DataView(buffer);

  // RIFF Chunk
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + numSamples * 2, true);
  writeString(view, 8, 'WAVE');

  // fmt Subchunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);  // AudioFormat (1 = PCM)
  view.setUint16(22, 1, true);  // Mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);

  // data Subchunk
  writeString(view, 36, 'data');
  view.setUint32(40, numSamples * 2, true);

  // Write PCM Samples
  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.max(-1, Math.min(1, generator(t)));
    view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
    offset += 2;
  }

  // Convert buffer to base64
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return `data:audio/wav;base64,${btoa(binary)}`;
}

function writeString(view: DataView, offset: number, string: string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

// 1. Transition Whoosh
export const transitionWhoosh = createWavDataUri(22050, 0.35, (t) => {
  const envelope = Math.sin((t / 0.35) * Math.PI);
  const freq = 200 + 600 * (t / 0.35);
  return Math.sin(2 * Math.PI * freq * t) * envelope * 0.4;
});

// 2. TypeScript Compiler Error Buzz
export const errorBuzzer = createWavDataUri(22050, 0.45, (t) => {
  const envelope = Math.exp(-t * 6);
  const tone1 = Math.sin(2 * Math.PI * 185 * t);
  const tone2 = Math.sin(2 * Math.PI * 196 * t);
  return (tone1 + tone2) * 0.5 * envelope * 0.5;
});

// 3. Success / Resolution Chime
export const successChime = createWavDataUri(22050, 0.5, (t) => {
  const envelope = Math.exp(-t * 5);
  const fundamental = Math.sin(2 * Math.PI * 523.25 * t);
  const overtone = Math.sin(2 * Math.PI * 659.25 * t);
  return (fundamental * 0.6 + overtone * 0.4) * envelope * 0.4;
});

// 4. Subtle Typing Click
export const typeClick = createWavDataUri(22050, 0.05, (t) => {
  const envelope = Math.exp(-t * 60);
  return (Math.random() * 2 - 1) * envelope * 0.25;
});

// 5. Alarm Klaxon
export const alarmKlaxon = createWavDataUri(22050, 0.6, (t) => {
  const freq = 440 + Math.sin(t * 20) * 120;
  const envelope = Math.sin((t / 0.6) * Math.PI);
  return Math.sin(2 * Math.PI * freq * t) * envelope * 0.4;
});

// 6. Victory Fanfare
export const victoryFanfare = createWavDataUri(22050, 0.8, (t) => {
  const envelope = Math.exp(-t * 3);
  const c = Math.sin(2 * Math.PI * 523.25 * t);
  const e = Math.sin(2 * Math.PI * 659.25 * t);
  const g = Math.sin(2 * Math.PI * 783.99 * t);
  return (c * 0.4 + e * 0.3 + g * 0.3) * envelope * 0.5;
});

// 7. PagerDuty / Slack Alert Ping (two-tone urgent chime)
export const pagerDutyPing = createWavDataUri(22050, 0.4, (t) => {
  const envelope = Math.exp(-t * 8);
  const f = t < 0.15 ? 880 : 1320; // High A to E beep
  return Math.sin(2 * Math.PI * f * t) * envelope * 0.5;
});

// 8. Shield Power-up Activation (rising harmonic sweep)
export const shieldActivation = createWavDataUri(22050, 0.5, (t) => {
  const envelope = Math.sin((t / 0.5) * Math.PI);
  const freq = 300 + 900 * Math.pow(t / 0.5, 2);
  return Math.sin(2 * Math.PI * freq * t) * envelope * 0.45;
});
