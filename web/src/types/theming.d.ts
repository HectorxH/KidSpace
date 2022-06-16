/* eslint-disable no-unused-vars */
import { PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary']
    quaternary: Palette['primary']
    textcol: Palette['primary']
    extra: Palette['primary']
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions['primary']
    quaternary?: PaletteColorOptions['primary']
    textcol?: PaletteColorOptions['primary']
    extra?: PaletteColorOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true,
    quaternary: true,
    textcol: true,
    extra: true,
  }
}
