import { createContext, useContext } from 'react'
import { useDarkmode } from '../hooks/useDarkMode'

const DarkModeContext = createContext({
  isDark: false,
  toggle: () => {},
})

export const useDark = () => useContext(DarkModeContext)

const DarkModeProvider: React.FC = ({ children }) => {
  const { isDark, toggle } = useDarkmode()
  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export default DarkModeProvider
