import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      default: '#fefefe',
      paper: '#F1F3F4',
    },
  },
  typography: {
    overline: {
      fontWeight: 500,
      fontSize: '0.7rem',
    },
  },
})

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#202124',
      paper: '#535456',
    },
    text: {
      primary: '#E8EAED',
      secondary: '#FFFFFFDE',
    },
  },
  typography: {
    overline: {
      fontWeight: 500,
      fontSize: '0.7rem',
    },
  },
})

const mainTheme = (dark: boolean) =>
  createMuiTheme({
    palette: {
      type: dark ? 'dark' : 'light',
    },
  })

export const light = responsiveFontSizes(lightTheme)
export const dark = responsiveFontSizes(darkTheme)
export const main = (dark: boolean) => responsiveFontSizes(mainTheme(dark))
