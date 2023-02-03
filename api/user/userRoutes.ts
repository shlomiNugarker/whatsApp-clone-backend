import express from 'express'

import userController from './userController'

const router = express.Router()

router.get('/email/:email', userController.getUserByEmail)
router.get('/userId/:userId', userController.getUserByUserId)
router.post('/', userController.addUser)

export default router
