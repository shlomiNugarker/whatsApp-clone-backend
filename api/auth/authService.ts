import bcrypt from 'bcrypt'
import userService from '../user/userService'
import { IUser } from '../../models/IUser'

export default {
  login,
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
