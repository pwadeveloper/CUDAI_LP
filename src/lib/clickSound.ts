// Synthesised "light switch" click - a short filtered-noise transient plus a
// quick mechanical tock. No audio asset needed. Higher pitch for on, lower for
// off. Runs only after a user gesture (the toggle), which is when an
// AudioContext is allowed to start.

let ac: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ac) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    ac = new AC();
  }
  return ac;
}

export function playSwitch(on: boolean) {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume();
  const now = ctx.currentTime;

  // 1) Sharp click transient (filtered noise burst)
  const dur = 0.05;
  const len = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    const t = i / len;
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - t, 9);
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buf;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = on ? 2600 : 1600;
  bp.Q.value = 0.9;
  const ng = ctx.createGain();
  ng.gain.value = 0.45;
  noise.connect(bp).connect(ng).connect(ctx.destination);
  noise.start(now);
  noise.stop(now + dur);

  // 2) Mechanical "tock" body
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(on ? 340 : 230, now);
  osc.frequency.exponentialRampToValueAtTime(on ? 190 : 120, now + 0.05);
  const og = ctx.createGain();
  og.gain.setValueAtTime(0.0001, now);
  og.gain.exponentialRampToValueAtTime(0.32, now + 0.004);
  og.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
  osc.connect(og).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.11);
}
