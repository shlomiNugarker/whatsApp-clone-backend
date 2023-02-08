import messageService from './messageService'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import userService from '../user/userService'

export default { getMessages, addMessage }

async function getMessages(req: Request, res: Response) {
  try {
    const { chatId } = req.params

    const messages = await messageService.query(chatId)
    res.json(messages)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get messages' })
  }
}

async function addMessage(req: Request, res: Response) {
  try {
    const message = req.body
    const addedMessage = await messageService.add(message)
    res.json(addedMessage)
  } catch (err) {
    res.status(500).send({ err: 'Failed to add message' })
  }
}
