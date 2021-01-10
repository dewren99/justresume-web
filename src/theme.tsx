import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

// const fonts = { 
//   mono: `'Menlo', monospace` 
// }

const colors = {
  black: '#333333',
  white: '#ffffff',
}

const fontSizes = {
  xs: "12px",
  sm: "14px",
  md: "16px",
  lg: "18px",
  xl: "20px",
  "2xl": "24px",
  "3xl": "28px",
  "4xl": "36px",
  "5xl": "48px",
  "6xl": "64px",
  "7xl": "100px",
  "8xl": "164px",
}

const fontWeights = {
  normal: 400,
  medium: 500,
  bold: 700,
}

const lineHeights = {
  normal: "normal",
  none: "1",
  shorter: "1.25",
  short: "1.375",
  base: "1.5",
  tall: "1.625",
  taller: "2",
}

const letterSpacings = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
}

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  colors,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  breakpoints,
});

export default theme;
