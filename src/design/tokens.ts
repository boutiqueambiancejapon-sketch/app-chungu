// ─── Palette adaptative (jour / nuit) ────────────────────────────────────────
export const palette = {
  night: {
    bg:             '#141328',
    bg2:            '#1B1928',
    surface:        '#1E1C30',
    surface2:       '#252340',
    surface3:       '#2D2B4C',
    text:           '#F5EDD8',
    text2:          '#BEAF96',
    text3:          '#9A8B74',
    hairline:       'rgba(255,255,255,0.10)',
    hairlineStrong: 'rgba(255,255,255,0.18)',
    terra:          '#D47850',
    terraDeep:      '#BC6440',
    terraTint:      '#301A10',
    gold:           '#DEB268',
    goldDeep:       '#C99A4E',
    goldTint:       '#2C2010',
  },
  day: {
    bg:             '#FAF7F0',
    bg2:            '#F2EAE0',
    surface:        '#FFFCF7',
    surface2:       '#F6F0E6',
    surface3:       '#EDE4D5',
    text:           '#2D1E14',
    text2:          '#5E3D27',
    text3:          '#866148',
    hairline:       '#E6D9C8',
    hairlineStrong: '#D0BDA8',
    terra:          '#BC6440',
    terraDeep:      '#99462A',
    terraTint:      '#F4E8DF',
    gold:           '#C99A4E',
    goldDeep:       '#9A7238',
    goldTint:       '#F4EDD9',
  },
  // Constantes neon — identiques jour/nuit
  neonRose:    '#F0407E',
  neonViolet:  '#8B45D6',
  neonMagenta: '#C73599',
} as const;

export type Colors = typeof palette.night;

export const gradients = {
  neon:     ['#F0407E', '#C73599', '#8B45D6'] as const,
  neonSoft: ['rgba(240,64,126,0.16)', 'rgba(139,69,214,0.16)'] as const,
  terra:    ['#D47850', '#6B2E14'] as const,
  gold:     ['#DEB268', '#BC6440'] as const,
  night:    ['#32296A', '#1A142F', '#4A1A48'] as const,
};

export const sp = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 } as const;
export const r  = { sm: 8, md: 14, card: 22, lg: 28, xl: 34 } as const;
