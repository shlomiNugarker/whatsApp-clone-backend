import userService from './userService'
import { Request, Response } from 'express'

export default {
  getUserByEmail,
  addUser,
}

async function getUserByEmail(req: Request, res: Response) {
  try {
    const user = await userService.getByEmail(req.params.id)
    res.send(user)
  } catch (err) {
    console.log('Failed to get user', err)
    res.status(500).send({ err: 'Failed to get user' })
  }
}

async function addUser(req: Request, res: Response) {
  try {
    const user = req.body
    const savedUser = await userService.add(user)
    res.send(savedUser)
  } catch (err) {
    console.log('Failed to update user', err)
    res.status(500).send({ err: 'Failed to update user' })
  }
}
