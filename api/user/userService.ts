import { IUser } from '../../models/IUser'
import DBService from '../../services/dbService'

export default {
  add,
  getByEmail,
}

async function add({ email, password, fullname }: any) {
  try {
    const sqlCmd = `INSERT INTO user (email,password,fullName) 
    VALUES ("${email}","${password}","${fullname}")`

    await DBService.runSQL(sqlCmd)

    const okPacket = await DBService.runSQL(sqlCmd)
    const lastInserted = await DBService.runSQL(
      `SELECT * from user where user.id = ${okPacket.insertId}`
    )

    return lastInserted[0]
  } catch (err: any) {
    console.log('cannot insert user', err)
    throw new Error(err.message)
  }
}

async function getByEmail(email: string) {
  try {
    const sqlCmd = `SELECT * FROM user WHERE user.email = ${email}`
    const users: IUser[] = await DBService.runSQL(sqlCmd)
    if (users.length === 1) return users[0]
  } catch (err: any) {
    throw new Error(err.message)
  }
}
