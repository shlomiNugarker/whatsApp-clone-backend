import DBService from '../../services/dbService'

export default {
  add,
  getByEmail,
  getByUserId,
  getUsers,
  update,
}

async function add({ email, password, fullname }: any) {
  try {
    const sqlCmd = `INSERT INTO user (email,password,fullName) 
    VALUES ("${email}","${password}","${fullname}")`

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

async function getUsers() {
  try {
    const sqlCmd = `SELECT * FROM user`
    const users: any = await DBService.runSQL(sqlCmd)

    return users
  } catch (err: any) {
    throw new Error(err.message)
  }
}

async function getByEmail(email: string) {
  try {
    const sqlCmd = `SELECT * FROM user WHERE email = '${email}'`
    const users: any = await DBService.runSQL(sqlCmd)

    if (users.length === 1) return users[0]
  } catch (err: any) {
    throw new Error(err.message)
  }
}
async function getByUserId(userId: string) {
  try {
    const sqlCmd = `SELECT * FROM user WHERE id = '${userId}'`
    const users: any = await DBService.runSQL(sqlCmd)

    if (users.length === 1) return users[0]
  } catch (err: any) {
    throw new Error(err.message)
  }
}

async function update(user: any) {
  try {
    const query = `UPDATE user SET
                          fullname = "${user.fullname}",
                          imgUrl = "${user.imgUrl}",
                          email = "${user.email}",
                          contacts = "${user.contacts}",
                          about = "${user.about}"
                  WHERE user.id = "${user.id}"`

    const okPacket = await DBService.runSQL(query)

    if (okPacket.affectedRows !== 0) {
      const lastInserted = await DBService.runSQL(
        `SELECT * from user where user.id = ${user.id}`
      )
      delete lastInserted[0].password
      return lastInserted[0]
    }
  } catch (err) {
    console.log(`cannot update user ${user._id}`, err)
    throw err
  }
}
