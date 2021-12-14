// import { useCallback } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import Quill, { TextChangeHandler } from 'quill'
import Delta from 'quill-delta'
import { makeStyles } from '@material-ui/core/styles'

import 'quill/dist/quill.snow.css'
import Toolbar from '../components/Toolbar'
import { SAVE_INTERVAL_MS, socket } from '../constants/texteditor'

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
  }, [wrapperRef, toolbarRef])

  useEffect(() => {
    if (!wrapperRef.current) {
      return
    }
    // if (!toolbarRef.current) {
    //   return
    // }
    if (!quill) {
      return
    }
    const wrapper = wrapperRef.current
    // const toolbar = toolbarRef.current

    // toolbar.classList.add(classes.toolbar)
    // wrapper.classList.add(classes.editor)
    wrapper.lastElementChild?.classList.add(classes.editor)
    return () => {
      //   toolbar.classList.remove(classes.toolbar)
      // wrapper.classList.remove(classes.editor)
      wrapper.lastElementChild?.classList.remove(classes.editor)
    }
  }, [quill, classes.editor])

  return (
    <div className={`container`} id="container" ref={wrapperRef}>
      <Toolbar className={classes.toolbar} ref={toolbarRef} />
    </div>
  )
}

export default TextEditor
