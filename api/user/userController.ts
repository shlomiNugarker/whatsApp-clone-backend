import userService from './userService'
import { Request, Response } from 'express'

export default {
  getUserByEmail,
  addUser,
  getUserByUserId,
  query,
  updateUser,
}

async function query(req: Request, res: Response) {
  try {
    const users = await userService.getUsers()

    res.send(users)
  } catch (err) {
    console.log('Failed to get users', err)
    res.status(500).send({ err: 'Failed to get users' })
  }
}
async function getUserByEmail(req: Request, res: Response) {
  try {
    const user = await userService.getByEmail(req.params.email)
    res.send(user)
  } catch (err) {
    console.log('Failed to get user', err)
    res.status(500).send({ err: 'Failed to get user' })
  }
}
async function getUserByUserId(req: Request, res: Response) {
  try {
    const user = await userService.getByUserId(req.params.userId)
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

async function updateUser(req: Request, res: Response) {
  try {
    const user = req.body

    const savedUser = await userService.update(user)
    res.send(savedUser)
  } catch (err) {
    console.log('Failed to update user', err)
    res.status(500).send({ err: 'Failed to update user' })
  }
}
