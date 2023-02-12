import mysql, { Connection, MysqlError } from 'mysql'

export default {
  runSQL,
}

let pool: mysql.Pool

pool = mysql.createPool({
  host: process.env.HOST_DB,
  port: 3306,
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  database: process.env.DATABASE_DB,
  insecureAuth: true,
})

pool.on('connection', function (connection: Connection) {
  console.log('DB Connection established')

  connection.on('error', function (err: MysqlError) {
    console.error(new Date(), 'MySQL error', err.code)
  })
  connection.on('close', function (err: MysqlError) {
    console.error(new Date(), 'MySQL close', err)
  })
})

function runSQL(sqlCommand: any): Promise<any> {
  return new Promise((resolve, reject) => {
    pool.query(
      sqlCommand,
      function (error: unknown, results: any, fields: any) {
        if (error) reject(error)
        else resolve(results)
      }
    )
  })
}

// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '',
//   database: 'whatsapp_db',
//   insecureAuth: true,
// })

let pool: mysql.Pool

function handleDisconnect() {
  setTimeout(() => {
    pool = mysql.createPool({
      host: process.env.HOST_DB,
      port: 3306,
      user: process.env.USER_DB,
      password: process.env.PASSWORD_DB,
      database: process.env.DATABASE_DB,
      insecureAuth: true,
    })

    pool.on('connection', function (connection: Connection) {
      console.log('DB Connection established')

      connection.on('error', function (err: MysqlError) {
        console.error(new Date(), 'MySQL error', err.code)
      })
      connection.on('close', function (err: MysqlError) {
        console.error(new Date(), 'MySQL close', err)
      })
    })
  })
}
function runSQL(sqlCommand: any): Promise<any> {
  return new Promise((resolve, reject) => {
    pool.query(
      sqlCommand,
      function (error: unknown, results: any, fields: any) {
        if (error) reject(error)
        else resolve(results)
      }
    )
  })
}
handleDisconnect()
