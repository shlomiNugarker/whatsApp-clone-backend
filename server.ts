import express, { Express } from 'express'
import { json } from 'body-parser'
import expressSession from 'express-session'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'

import cookieParser from 'cookie-parser'

import authRoutes from './api/auth/authRoutes'
import userRoutes from './api/user/userRoutes'
import chatRoutes from './api/chat/chatRoutes'

const MemoryStore = require('memorystore')(expressSession)

dotenv.config()

const app: Express = express()
const http = require('http').createServer(app)

const session = expressSession({
  secret: 'secret session',
  resave: false,
  saveUninitialized: false, // don't create session until something stored
  cookie: { secure: true },
  store: new MemoryStore({
    checkPeriod: 86400000, // prune expired entries every 24h
  }),
})

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('No session')) //handle error
  }
  next() //otherwise continue
})

app.use(session)
app.use(json())
app.use(cookieParser())
app.use(express.static('public'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')))
} else {
  const corsOptions = {
    origin: [
      'http://127.0.0.1:3000',
      'http://localhost:3000',
      'http://localhost:4200',
    ],
    credentials: true,
  }
  app.use(cors(corsOptions))

  app.use('/api/auth', authRoutes)
  app.use('/api/user', userRoutes)
  app.use('/api/chat', chatRoutes)
}

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 3030
http.listen(PORT, () => {
  console.log(`⚡️Server is running on port: ${PORT}`)
})
