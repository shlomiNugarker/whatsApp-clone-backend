import chatService from './chatService'
import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import userService from '../user/userService'

export default { getChats, getChatById, addChat, updateChat }

async function getChats(req: Request, res: Response) {
  try {
    const { userId } = req.params

    const chats = await chatService.query(userId)

    res.json(chats)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get chats' })
  }
}

async function getChatById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const chat = await chatService.getById(id)
    res.json(chat)
  } catch (err) {
    res.status(500).send({ err: 'Failed to get chat' })
  }
}

async function addChat(req: Request, res: Response) {
  try {
    const chat = req.body
    const addedChat = await chatService.add(chat)
    res.json(addedChat)
  } catch (err) {
    res.status(500).send({ err: 'Failed to add chat' })
  }
}

async function updateChat(req: Request, res: Response) {
  try {
    const chat = req.body

    const updatedChat = await chatService.update(chat)
    res.json(updatedChat)
  } catch (err) {
    res.status(500).send({ err: 'Failed to update chat' })
  }
}
