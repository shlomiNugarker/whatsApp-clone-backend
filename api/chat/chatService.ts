import DBService from '../../services/dbService'

export default {
  query,
  getById,
  add,
  update,
}

async function query(userId: string) {
  try {
    const query = `SELECT * FROM chat WHERE chat.userId = ${userId} OR chat.userId2 = ${userId}`
    const chats = DBService.runSQL(query)
    return chats
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
  const { userId, userId2, messages, createdAt } = chat

  try {
  } catch (err: any) {
    throw new Error(err.message)
  }
}

async function update(chat: any) {
  try {
    const query = `UPDATE chat set 
                          userId = ${chat.userId},
                          userId2 = ${chat.userId2},
                          createdAt = ${chat.createdAt},
                          messages = "${chat.messages}",
                   WHERE chat.id = ${chat.id}`

    const chats = DBService.runSQL(query)
  } catch (err: any) {
    throw new Error(err.message)
  }
}
