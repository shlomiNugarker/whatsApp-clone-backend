import bcrypt from 'bcrypt'
import userService from '../user/userService'
import { IUser } from '../../models/IUser'

export default {
  login,
  signup,
}

async function login(email: string, password: string) {
  try {
    const user: any = await userService.getByEmail(email)

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw new Error('Invalid userName or password')
    delete user.password
    return user
  } catch (err: any) {
    throw new Error('Invalid username or password')
  }
}
async function signup(email: string, password: string, fullname: string) {
  try {
    if (!email || !password || !fullname)
      return Promise.reject('fullName, userName or password are required!')

    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    return await userService.add({ email, password: hash, fullname })
  } catch (err: any) {
    throw new Error('Invalid username or password')
  }
}
