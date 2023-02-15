import { Socket } from 'socket.io'

export default {
  connectSockets,
}

let gIo: any

class mySocket extends Socket {
  userId: null | string = null
}

function connectSockets(http: any, _session: any) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
      pingTimeout: 60000,
    },
  })
  gIo.on('connection', (socket: mySocket) => {
    // console.log('connection with socketId ', socket.id)

    socket.on('login', async (user: any) => {
      socket.userId = user.id
    })

    socket.on('logout', (user: any) => {})

    socket.on('update-chat', async ({ chat, emitTo }) => {
      sendUpdatedChat(chat, emitTo)
    })
    socket.on('add-chat', async ({ chat, emitTo }) => {
      sendAddedChat(chat, emitTo)
    })

    socket.on('disconnect', async (args) => {
      // console.log('disconnect with socket.userId: ', socket.userId)
    })
  })
}

async function getAllSockets() {
  if (!gIo) return
  const sockets: mySocket[] = await gIo.fetchSockets()
  return sockets
}

async function sendUpdatedChat<T>(chat: T, emitTo: string) {
  const socket = await findUserSocket(emitTo)
  if (!socket) return
  socket.emit('chat-updated', { chat })
}
async function sendAddedChat<T>(chat: T, emitTo: string) {
  const socket = await findUserSocket(emitTo)
  if (!socket) return
  socket.emit('chat-added', { chat })
}

async function findUserSocket(userId: string) {
  const sockets: mySocket[] = await gIo.fetchSockets()
  const socket = sockets.find((socket) => socket.userId === userId)
  return socket
}
