import { useCallback, useEffect, useState } from 'react'

export const useDarkmode = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true)
    }
  }, [])

  const toggle = useCallback(() => {
    setIsDark(prevMode => !prevMode)
  }, [])

  return { isDark, toggle }
}
