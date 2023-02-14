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
    const chats = await DBService.runSQL(query)

    console.log({ chats })

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
  try {
    const sqlCmd = `INSERT INTO chat (userId, userId2, messages, reactions,createdAt) 
  VALUES (${chat.userId},
          ${chat.userId2},
          '${chat.messages}',
          '${chat.reactions}',
          ${chat.createdAt})`

    const okPacket = await DBService.runSQL(sqlCmd)
    const lastInserted = await DBService.runSQL(
      `SELECT * from chat where chat.id = ${okPacket.insertId}`
    )

    return lastInserted[0]
  } catch (err: any) {
    console.log(err)
    throw new Error(err.message)
  }
}

async function update(chat: any) {
  try {
    const query = `UPDATE chat set 
                          userId = ${chat.userId},
                          userId2 = ${chat.userId2},
                          createdAt = ${chat.createdAt},
                          messages = '${chat.messages}'
                   WHERE chat.id = ${chat.id}`

    const savedChat = await DBService.runSQL(query)

    return savedChat
  } catch (err: any) {
    console.log(err)
    throw new Error(err.message)
  }
}
