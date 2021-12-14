/**
 * @type {import('socket.io-client').Socket}
 */
const socket = io()

/**
 * @type {HTMLTextAreaElement}
 */
const input = document.getElementById('in')

socket.connect()
socket.on('connect', () => {
  console.log(socket)
  console.log(socket.id) // x8WIv7
})

socket.on('load', loadedDoc => {
  console.log(loadedDoc)
})
socket.emit('initialize', '123id')

socket.on('realtime', doc => {
  input.value = doc.text
})

input.addEventListener('input', function () {
  console.log('text:', this.value)
  socket.emit('realtime', { text: this.value })
})
// socket.disconnect()
