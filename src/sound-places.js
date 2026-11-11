// Camino soundscape: one parameter set per chapter, matched to the walk.
// Porto: Douro river water, gulls, a distant tram bell.
// Atlantic boardwalk: open-ocean surf, dune wind, gulls.
// Tui: the Miño running faster, a far cathedral bell, doves.
// Pontevedra paths: pine-canopy wind, cuckoos, wood-pigeons.
// Santiago: a quiet stone square, the big bell far above, pigeons.
// No voice, no song, no melody, no samples; synthesized in the browser.
export const SOUND_PLACES = [
  { id: 'porto', beds: [{ type: 'surf', params: { period: 3.6, lowpass: 1250, swash: 0.32, swashFreq: 1000, power: 1.2 }, gain: 0.34 }, { type: 'wind', params: { baseCutoff: 560, gustRate: 0.07, gustDepth: 0.5 }, gain: 0.12 }], voices: [{ kind: 'gull', weight: 0.5, gain: 0.045 }, { kind: 'rickshawBell', weight: 0.3, gain: 0.03, params: { base: 1200 } }, { kind: 'dove', weight: 0.2, gain: 0.045 }], voiceGap: [18, 42] },
  { id: 'coast', beds: [{ type: 'surf', params: { period: 9, lowpass: 950, swash: 0.55, swashFreq: 720 }, gain: 0.55 }, { type: 'wind', params: { baseCutoff: 480, gustRate: 0.09, gustDepth: 0.8 }, gain: 0.2 }], voices: [{ kind: 'gull', weight: 0.9, gain: 0.05 }, { kind: 'dove', weight: 0.1, gain: 0.04 }], voiceGap: [14, 36] },
  { id: 'tui', beds: [{ type: 'surf', params: { period: 1.6, lowpass: 1700, swash: 0.42, swashFreq: 1300, power: 1.0 }, gain: 0.34 }, { type: 'wind', params: { baseCutoff: 520, gustRate: 0.07, gustDepth: 0.55 }, gain: 0.12 }], voices: [{ kind: 'bell', weight: 0.4, gain: 0.04, params: { base: 240, lowpass: 2200 } }, { kind: 'dove', weight: 0.6, gain: 0.05 }], voiceGap: [26, 60] },
  { id: 'forest', beds: [{ type: 'wind', params: { baseCutoff: 620, wander: 260, gustRate: 0.08, gustDepth: 0.65 }, gain: 0.4 }, { type: 'surf', params: { period: 5, lowpass: 5200, swash: 0.12, swashFreq: 3800, tone: 5200, power: 2.2 }, gain: 0.1 }], voices: [{ kind: 'cuckoo', weight: 0.6, gain: 0.05 }, { kind: 'dove', weight: 0.4, gain: 0.05 }], voiceGap: [14, 38] },
  { id: 'santiago', beds: [{ type: 'wind', params: { baseCutoff: 520, gustRate: 0.06, gustDepth: 0.4 }, gain: 0.55 }], voices: [{ kind: 'bell', weight: 0.45, gain: 0.045, params: { base: 170, lowpass: 1800 } }, { kind: 'dove', weight: 0.55, gain: 0.05 }], voiceGap: [24, 55] },
];
