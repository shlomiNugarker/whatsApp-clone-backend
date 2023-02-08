import authService from './authService'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import userService from '../user/userService'

export default { login, signup, logout, verifyToken }

declare module 'express-session' {
  interface SessionData {
    user: any
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body
    const user = await authService.login(email, password)

    // jwt:
    const accessToken = jwt.sign(
      { email: user.email, id: user.id },
      process.env.TOKEN_SECRET as string,
      { expiresIn: '24h' }
    )

    res.cookie('accessToken', accessToken, {
      maxAge: 60 * 1000 * 60 * 24, // 24H  //mil
      httpOnly: true,
    })

    res.json({ user, accessToken })
  } catch (err) {
    console.log('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function signup(req: Request, res: Response) {
  try {
    const { email, password, fullname } = req.body
    const isUserExist = await userService.getByEmail(email)
    if (isUserExist) throw new Error('Failed to signup ')

    await authService.signup(email, password, fullname)

    // const user = await authService.login(email, password)

    res.status(200)
    res.send({ msg: 'Sign up successfully' })
  } catch (err) {
    console.log('Failed to signup ' + err)
    res.status(500).send({ err: 'Failed to signup' })
  }
}

async function logout(req: Request, res: Response) {
  try {
    res.clearCookie('accessToken')
    res.send({ msg: 'Logged out successfully' })
    res.end()
  } catch (err) {
    res.status(500).send({ err: 'Failed to logout' })
  }
}

async function verifyToken(req: Request, res: Response) {
  try {
    let { accessToken } = req.body
    const validToken = jwt.verify(
      accessToken,
      process.env.TOKEN_SECRET as string
    )
    if (validToken) res.send({ isValidToken: true })
    else res.status(500).send({ isValidToken: false })
  } catch (err) {
    res.status(500).send({ isValidToken: false })
  }
}
