import { Pool, PoolConfig } from 'pg'

export const poolConfig: PoolConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'ppooii12',
  database: 'quill',
}

export const pool = new Pool(poolConfig)
