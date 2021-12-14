import fp from 'fastify-plugin'
import type { ServerOptions } from 'socket.io'
/**
 * This plugins adds some utilities to handle http errors
 *
 * @see https://github.com/fastify/fastify-sensible
 */
export default fp<ServerOptions>(async (fastify, _opts) => {
  fastify.register(import('fastify-socket.io'), {
    logLevel: 'debug',
  })
})
