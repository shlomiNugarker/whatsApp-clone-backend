import DBService from '../../services/dbService'

export default {
  query,
  add,
}

async function query(chatId: string) {
  try {
    return messagesDB
  } catch (err: any) {
    throw new Error(err.message)
  }
}

async function add(message: any) {
  try {
  } catch (err: any) {
    throw new Error(err.message)
  }
}

const messagesDB = [
  {
    id: 'fgsdfg',
    userId: 'sdgdsgf',
    text: 'hey there :)',
    createdBy: '61',
    reactions: [],
    createdAt: 43436535,
    replies: [],
  },
  {
    id: 'fgg',
    userId: 'sdgdsgf',
    text: 'hey tdfhere :)',
    createdBy: '61',
    reactions: [],
    createdAt: 43436535,
    replies: [],
  },
  {
    id: 'fgg',
    userId: 'sdgdsgf',
    text: 'hey tf sdf  sd here :)',
    createdBy: '61',
    reactions: [],
    createdAt: 43436535,
    replies: [],
  },
]
