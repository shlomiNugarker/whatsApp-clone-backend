import { Socket } from 'socket.io'

export default {
  connectSockets,
}

let gIo: any

function connectSockets(http: any, _session: any) {
  gIo = require('socket.io')(http, {
    cors: {
      origin: '*',
      pingTimeout: 60000,
    },
  })
  gIo.on('connection', (socket: Socket) => {
    socket.on('disconnect', async (args) => {
      console.log(socket.id)
    })
  })
}
