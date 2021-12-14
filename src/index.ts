import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import { documentRef } from './admin'
dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['*'],
    allowedHeaders: ['*'],
  },
})

app.use(
  cors({
    origin: '*',
    methods: ['*'],
    allowedHeaders: ['*'],
  })
)

app.use('*', (_, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  next()
})

const defaultValue = ''

io.on('connection', socket => {
  console.log('Connected')

  socket.on('quill-editor-get-document', async (documentId: string) => {
    const document = await findOrCreateDocument(documentId)

    await socket.join(documentId)
    socket.emit('quill-editor-load-document', document.val())

    socket.on('quill-editor-send-changes', (delta, index) => {
      socket.broadcast
        .to(documentId)
        .emit('quill-editor-receive-changes', delta)
    })

    socket.on('quill-editor-save-document', async data => {
      await saveToDatabase(documentId, data)
    })
  })
})

async function saveToDatabase(id: string, value: string) {
  if (!id) return

  const document = await documentRef.child(id).get()

  if (document.exists()) return documentRef.child(id).update(value)

  return await documentRef.child(id).set(value)
}

async function findOrCreateDocument(id: string) {
  const doc = documentRef.child(id)

  const document = await doc.get()

  if (document.exists()) return document

  await doc.set(defaultValue)
  return doc.get()
}

app.get('/test', (_, res) => {
  res.send('Server running...')
})

const port = process.env.PORT || 3001
server.listen(port, () => console.log('>_ http://localhost:3001'))
