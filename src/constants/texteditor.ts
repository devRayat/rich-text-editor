import { io } from 'socket.io-client'

export const SAVE_INTERVAL_MS = 2000

export const socket = io('https://rayat-central-socket.herokuapp.com')
