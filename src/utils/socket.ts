import { instrument } from '@socket.io/admin-ui'
import type { FastifyInstance } from 'fastify'

let db: Record<string, any> = {}

export default function socket(fastify: FastifyInstance, _err: Error) {
  instrument(fastify.io, {
    auth: false,
  })

  fastify.io.on('connection', socket => {
    console.log('connected')

    socket.on('initialize', async (documentId: string) => {
      // fetch initial doc or create new one from database
      let doc = db[documentId]
      if (!doc) {
        doc = db[documentId] = {
          id: documentId,
          text: '',
        }
      }
      await socket.join(documentId)
      //
      socket.emit('load', doc)

      socket.on('realtime', (data: any) => {
        console.log(data)
        socket.broadcast.to(documentId).emit('realtime', data)
      })

      socket.on('save', _ => {
        // save document to database
        fastify.log.debug('saved')
      })
    })
  })
}
