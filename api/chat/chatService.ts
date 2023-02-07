import DBService from '../../services/dbService'

export default {
  query,
  getById,
  add,
  update,
}

async function query() {
  try {
    return chatsDB
  } catch (err: any) {
    throw new Error(err.message)
  }
}

async function getById(chatId: string) {
  try {
  } catch (err: any) {
    throw new Error(err.message)
  }
}

async function add(chat: any) {
  const { userId, userId2, messages, createdAt, users } = chat
  try {
  } catch (err: any) {
    throw new Error(err.message)
  }
}

async function update(chat: any) {
  try {
  } catch (err: any) {
    throw new Error(err.message)
  }
}

const chatsDB = [
  {
    id: '1dfgfsg',
    userId: ['1', '2'],
    createdAt: 455445454,
  },
  {
    id: '1dfhxfh',
    userId: ['1', '2'],
    createdAt: 455445454,
  },
]
