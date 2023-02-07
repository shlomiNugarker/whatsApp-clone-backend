import express from 'express'
import messageController from './messageController'

const router = express.Router()

router.get('/:chatId', messageController.getMessages)
router.post('/', messageController.addMessage)

export default router
