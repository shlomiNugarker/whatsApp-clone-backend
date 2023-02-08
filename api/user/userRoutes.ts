import express from 'express'

import userController from './userController'
import { jwtService } from '../../middlewares/validateToken'

const { validateToken } = jwtService

const router = express.Router()

router.get('/', validateToken, userController.query)
router.get('/email/:email', validateToken, userController.getUserByEmail)
router.get('/userId/:userId', validateToken, userController.getUserByUserId)
router.post('/', validateToken, userController.addUser)

export default router
