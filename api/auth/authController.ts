import authService from './authService'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

export default { login, signup, logout }

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
    const jwtBearerToken = jwt.sign(
      { email: user.email, id: user.id },
      process.env.TOKEN_SECRET as string
    )
    res.cookie('access-token', jwtBearerToken, {
      maxAge: 60 * 1000 * 60 * 24, // 24H  //mil
      httpOnly: true,
    })

    res.json(user)
  } catch (err) {
    console.log('Failed to Login ' + err)
    res.status(401).send({ err: 'Failed to Login' })
  }
}

async function signup(req: Request, res: Response) {
  try {
    const { email, password, fullname } = req.body
    const account = await authService.signup(email, password, fullname)

    const user = await authService.login(email, password)

    req.session.user = user
    res.json(user)
  } catch (err) {
    console.log('Failed to signup ' + err)
    res.status(500).send({ err: 'Failed to signup' })
  }
}

async function logout(req: Request, res: Response) {}
