import type { ColorPreset, Contrast, Direction, PaletteMode } from '@/theme';

export type NavColor = 'blend-in' | 'discrete' | 'evident';

export interface Settings {
  colorPreset?: ColorPreset;
  contrast?: Contrast;
  direction?: Direction;
  navColor?: NavColor;
  paletteMode?: PaletteMode;
  responsiveFontSizes?: boolean;
  stretch?: boolean;
}
