// import { useCallback } from 'react'
import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useParams } from 'react-router-dom'

import Quill, { TextChangeHandler } from 'quill'
import Delta from 'quill-delta'
import { io } from 'socket.io-client'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import DarkIcon from '@material-ui/icons/Brightness4Outlined'
import LightIcon from '@material-ui/icons/Brightness5Outlined'

import 'quill/dist/quill.snow.css'
import { useDarkmode } from './hooks/useDarkMode'

const SAVE_INTERVAL_MS = 2000
// const TOOLBAR_OPTIONS = [
//   [{ header: [1, 2, 3, 4, 5, 6, false] }],
//   [{ font: [] }],
//   [{ list: 'ordered' }, { list: 'bullet' }],
//   ['bold', 'italic', 'underline'],
//   [{ color: [] }, { background: [] }],
//   [{ script: 'sub' }, { script: 'super' }],
//   [{ align: [] }],
//   ['image', 'blockquote', 'code-block'],
//   ['clean'],
// ]

const socket = io('https://rayat-central-socket.herokuapp.com')

const useStyles = makeStyles(theme => ({
  '@global': {
    '.ql-snow': {
      '& .ql-picker': {
        color: theme.palette.text.primary,
      },
      '& .ql-stroke': {
        stroke: theme.palette.action.active,
      },
      '& .ql-fill': {
        fill: theme.palette.action.active,
      },
      '& .ql-picker-options': {
        backgroundColor: theme.palette.background.default,
      },
    },
  },
  toolbar: {
    backgroundColor: theme.palette.background.paper,
  },
  editor: {
    '& .ql-editor': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}))

const TextEditor = () => {
  const [quill, setQuill] = useState<Quill>()
  const classes = useStyles()

  const { id: documentId } = useParams<{ id: string }>()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const toolbarRef = useRef<HTMLDivElement>(null)

  // Send document id and load document
  useEffect(() => {
    if (!socket || !quill) return

    socket.once('quill-editor-load-document', document => {
      quill.enable()
      quill.setContents(document)
    })

    socket.emit('quill-editor-get-document', documentId)
  }, [quill, documentId])

  // Save document every 2 seconds
  useEffect(() => {
    if (!socket || !quill) return

    const interval = setInterval(() => {
      socket.emit('quill-editor-save-document', quill.getContents())
    }, SAVE_INTERVAL_MS)

    return () => {
      clearInterval(interval)
    }
  }, [quill])

  // Recieve changes
  useEffect(() => {
    if (!socket || !quill) return

    const handler = (delta: Delta) => {
      quill.updateContents(delta)
    }
    socket.on('quill-editor-receive-changes', handler)

    return () => {
      socket.off('quill-editor-receive-changes', handler)
    }
  }, [quill])

  // Text change event
  useEffect(() => {
    if (!quill) return
    const handler: TextChangeHandler = (delta, _, source) => {
      if (source !== 'user') return
      socket.emit('quill-editor-send-changes', delta)
    }
    quill.on('text-change', handler)

    return () => {
      quill.off('text-change', handler)
    }
  }, [quill])

  // Initialize Quill
  useEffect(() => {
    if (!wrapperRef.current) {
      return
    }
    if (!toolbarRef.current) {
      return
    }
    // if (!!quill) {
    //   return
    // }
    const editor = document.createElement('div')
    wrapperRef.current.append(editor)
    const q = new Quill(editor, {
      theme: 'snow',
      // modules: { toolbar: TOOLBAR_OPTIONS },
      modules: { toolbar: { container: toolbarRef.current } },
    })
    q.disable()
    q.setText('Loading...')

    setQuill(q)

    // toolbarRef.current.classList.add(classes.toolbar)
    // wrapperRef.current.classList.add(classes.editor)

    const ref = wrapperRef.current
    const tool = toolbarRef.current
    return () => {
      ref.innerHTML = ''
      ref.appendChild(tool)
    }
  }, [wrapperRef])

  useEffect(() => {
    if (!wrapperRef.current) {
      return
    }
    if (!toolbarRef.current) {
      return
    }
    if (!quill) {
      return
    }
    const wrapper = wrapperRef.current
    const toolbar = toolbarRef.current

    toolbar.classList.add(classes.toolbar)
    // wrapper.classList.add(classes.editor)
    wrapper.lastElementChild?.classList.add(classes.editor)
    return () => {
      toolbar.classList.remove(classes.toolbar)
      // wrapper.classList.remove(classes.editor)
      wrapper.lastElementChild?.classList.remove(classes.editor)
    }
  }, [quill, classes])

  return (
    <div className={`container`} id="container" ref={wrapperRef}>
      <Toolbar ref={toolbarRef} />
    </div>
  )
}

export default TextEditor

interface Options {
  [key: string]: {
    content: (number | string | boolean)[]
    type: 'dropdown' | 'button' | 'item'
  }
}

const TOOLBAR_OPTIONS_X: Options = {
  header: {
    content: [1, 2, 3, 4, 5, 6, false],
    type: 'dropdown',
  },
  size: {
    content: ['small', false, 'large', 'huge'],
    type: 'dropdown',
  },
  font: {
    content: [],
    type: 'dropdown',
  },
  list: {
    content: ['ordered', 'bullet'],
    type: 'button',
  },
  styles: {
    content: ['bold', 'italic', 'underline', 'strike'],
    type: 'item',
  },
  color: {
    content: [],
    type: 'dropdown',
  },
  background: {
    content: [],
    type: 'dropdown',
  },
  script: {
    content: ['sub', 'super'],
    type: 'button',
  },
  align: {
    content: ['', 'center', 'right', 'justify'],
    type: 'button',
  },
  items: {
    content: ['image', 'blockquote', 'code-block'],
    type: 'item',
  },
}
// ['clean'],

export const Toolbar = forwardRef<HTMLDivElement, {}>((_, ref) => {
  const { isDark, toggle } = useDark()
  return (
    <div ref={ref} id="toolbar">
      <Tools options={TOOLBAR_OPTIONS_X} />
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

const Tools = ({ options }: { options: Options }) => {
  let formats: JSX.Element[] = []

  for (const key in options) {
    let component: JSX.Element | JSX.Element[]
    if (Object.prototype.hasOwnProperty.call(options, key)) {
      if (options[key].type === 'button') {
        component = (
          <Button
            key={key}
            className={key}
            options={options[key].content as string[]}
          />
        )
      } else if (options[key].type === 'item') {
        component = (
          <Item
            key={key}
            className={key}
            options={options[key].content as string[]}
          />
        )
      } else {
        component = (
          <Select key={key} className={key} options={options[key].content} />
        )
      }
      formats.push(component)
    }
  }

  return <>{formats}</>
}

const Button: React.FC<ButtonProps> = ({ className, options, ...rest }) => {
  if (options.length === 0) {
    return <button {...rest} className={`ql-${className}`} />
  }
  return (
    <>
      {options.map(option => (
        <button
          key={option}
          {...rest}
          className={`ql-${className}`}
          value={option}
        />
      ))}
    </>
  )
}
const Item: React.FC<ButtonProps> = ({ className, options, ...rest }) => {
  if (options.length === 0) {
    return <button {...rest} className={`ql-${className}`} />
  }
  return (
    <>
      {options.map(option => (
        <button key={option} {...rest} className={`ql-${option}`} />
      ))}
    </>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: string[]
}

const Select: React.FC<SelectProps> = ({ className, options, ...rest }) => {
  return (
    <select
      name={`ql-${className}`}
      className={`ql-${className}`}
      defaultValue=""
    >
      {options.length !== 0 &&
        options.map(option => {
          if (typeof option === 'boolean') {
            return <option key={'selected'} value=""></option>
          }
          return <option key={option} value={option}></option>
        })}
    </select>
  )
}

interface SelectProps extends React.ButtonHTMLAttributes<HTMLSelectElement> {
  options: (number | string | boolean)[]
}

const DarkModeContext = createContext({
  isDark: false,
  toggle: () => {},
})

export const useDark = () => useContext(DarkModeContext)

export const DarkModeProvider: React.FC = ({ children }) => {
  const { isDark, toggle } = useDarkmode()
  return (
    <DarkModeContext.Provider value={{ isDark, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}
