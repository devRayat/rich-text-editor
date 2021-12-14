import { forwardRef } from 'react'
import IconButton from '@material-ui/core/IconButton'
import DarkIcon from '@material-ui/icons/Brightness4Outlined'
import LightIcon from '@material-ui/icons/Brightness5Outlined'
import { TOOLBAR_OPTIONS } from '../constants/toolbar'
import { useDark } from '../context/darkmode'
import Tools from './Tools'

const Toolbar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { isDark, toggle } = useDark()
  return (
    <div ref={ref} id="toolbar" {...props}>
      <Tools options={TOOLBAR_OPTIONS} />
      <IconButton
        aria-label="toggle dark theme"
        aria-controls="menu"
        size="medium"
        id="custom-button"
        onClick={toggle}
      >
        {isDark ? <LightIcon /> : <DarkIcon />}
      </IconButton>
    </div>
  )
})

export default Toolbar
