import { FastifyPluginAsync } from 'fastify'
// import type { SocketStream } from 'fastify-websocket'

const root: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/ws', async (req, reply) => {})

  fastify.get('/demo', (_req, reply) => {
    reply.sendFile('index.html')
  })
}

export default root
