export const colors = {
  bg: '#f5f6f0',
  ink: '#152420',
  inkSoft: '#5b6560',

  // Core money-green brand colors (unchanged, still used for primary actions,
  // goal card, emphasis text, etc.)
  brand: '#1f5c4e',
  brandDark: '#123d33',

  // Softer greens, for secondary fills — legend swatches, icon backgrounds
  leaf: '#8fbf95',
  sage: '#c7dac3',

  // Light pink accents — goal fill, subscription category, spending
  // section backdrop, anywhere that needs warmth against the green
  blush: '#f7dce6',
  rose: '#e48ca8',
  roseDeep: '#c96c8b',

  gold: '#c98a3b',
  goldSoft: '#f1e2c8',

  card: '#ffffff',
  line: '#e4e2d6',
  warn: '#a6432d',
  warnSoft: '#f4e2dc',
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 22,
  xl: 32,
};

// Optional: swap these for @expo-google-fonts/fraunces, inter, and
// ibm-plex-mono if you want the exact type pairing from the design —
// for the hackathon build, system fonts keep setup fast.
export const fonts = {
  display: undefined, // e.g. 'Fraunces_500Medium' once loaded
  body: undefined, // e.g. 'Inter_600SemiBold'
  mono: undefined, // e.g. 'IBMPlexMono_600SemiBold'
};