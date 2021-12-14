import fp from 'fastify-plugin'
import knex, { Knex } from 'knex'

export default fp<KnexOptions>(async (fastify, _opts) => {
  const database = knex({
    client: 'pg',
    version: '13',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'ppooii12',
      database: 'quill',
    },
  })

  database.on('query', data => {
    fastify.log.info(data.sql)
  })

  fastify.addHook('onError', (_fastify, _reply, _error, done) => {
    database.on('query-error', done)
  })

  fastify.decorate('knex', database)
})

interface KnexOptions extends Knex.Config {}

// When using .decorate you have to specify added properties for Typescript
declare module 'fastify' {
  export interface FastifyInstance {
    knex: Knex
  }
}
