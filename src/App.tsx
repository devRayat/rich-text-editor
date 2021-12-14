import { Route, Redirect } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { withSwitch } from './hoc/router'

import TextEditor, { DarkModeProvider, useDark } from './TextEditor'
import { dark, light } from './theme'

function App() {
  return (
    <>
      <ThemeProvider theme={light}>
        <CssBaseline />
        <Route path="/" exact>
          <Redirect to={`/document/${nanoid()}`} />
        </Route>
        <DarkModeProvider>
          <Route path="/document/:id">
            <MainThemeComponent />
          </Route>
        </DarkModeProvider>
      </ThemeProvider>
    </>
  )
}

// function MainTheme() {
//   return (
//     <DarkModeProvider>
//       <MainThemeComponent />
//     </DarkModeProvider>
//   )
// }

function MainThemeComponent() {
  const { isDark } = useDark()
  return (
    <ThemeProvider theme={isDark ? dark : light}>
      <CssBaseline />
      <TextEditor />
    </ThemeProvider>
  )
}

// export default App
export default withSwitch(App)
