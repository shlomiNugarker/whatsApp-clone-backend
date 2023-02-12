import mysql from 'mysql'

export default {
  runSQL,
}

// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '',
//   database: 'whatsapp_db',
//   insecureAuth: true,
// })

let connection: mysql.Connection

function handleDisconnect() {
  setTimeout(() => {
    connection = mysql.createConnection({
      host: process.env.HOST_DB,
      port: 3306,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_DB,
      insecureAuth: true,
    })

    connection.connect((err: unknown) => {
      if (err) throw new Error('mySql failed connection')
      console.log('connected to SQL server')
    })

    connection.on('error', function (err) {
      console.log('db error', err)
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        // Connection to the MySQL server is usually
        setTimeout(handleDisconnect, 2000) // lost due to either server restart, or a
      } else {
        // connnection idle timeout (the wait_timeout
        throw err // server variable configures this)
      }
    })
  })
}
function runSQL(sqlCommand: any): Promise<any> {
  return new Promise((resolve, reject) => {
    connection.query(
      sqlCommand,
      function (error: unknown, results: any, fields: any) {
        if (error) reject(error)
        else resolve(results)
      }
    )
  })
}
handleDisconnect()

// events.js:353
// throw er; // Unhandled 'error' event
// ^

// Error: Connection lost: The server closed the connection.
// at Protocol.end (/opt/render/project/src/node_modules/mysql/lib/protocol/Protocol.js:112:13)
// at Socket.<anonymous> (/opt/render/project/src/node_modules/mysql/lib/Connection.js:94:28)
// at Socket.<anonymous> (/opt/render/project/src/node_modules/mysql/lib/Connection.js:526:10)
// at Socket.emit (events.js:388:22)
// at endReadableNT (internal/streams/readable.js:1336:12)
// at processTicksAndRejections (internal/process/task_queues.js:82:21)
// Emitted 'error' event on Connection instance at:
// at Connection._handleProtocolError (/opt/render/project/src/node_modules/mysql/lib/Connection.js:423:8)
// at Protocol.emit (events.js:376:20)
// at Protocol._delegateError (/opt/render/project/src/node_modules/mysql/lib/protocol/Protocol.js:398:10)
// at Protocol.end (/opt/render/project/src/node_modules/mysql/lib/protocol/Protocol.js:116:8)
// at Socket.<anonymous> (/opt/render/project/src/node_modules/mysql/lib/Connection.js:94:28)
// [... lines matching original stack trace ...]
// at processTicksAndRejections (internal/process/task_queues.js:82:21) {
// fatal: true,
// code: 'PROTOCOL_CONNECTION_LOST'
// }
