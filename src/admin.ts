import * as admin from 'firebase-admin'
import dotenv from 'dotenv'

import { cred } from './credentials'

dotenv.config()

if (!admin.apps?.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: process.env.EXPRESS_APP_CLIENT_EMAIL,
      projectId: process.env.EXPRESS_APP_PROJECT_ID,
      privateKey: cred.private_key,
    }),
    databaseURL: process.env.EXPRESS_APP_DATABASE_URL,
  })
} else {
  admin.app()
}

export const database = admin.database()

export const documentRef = database.ref('editor/documents')
