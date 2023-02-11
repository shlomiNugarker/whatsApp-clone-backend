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

// setTimeout(() => {
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
// })

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
