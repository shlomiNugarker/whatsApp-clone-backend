"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbService_1 = __importDefault(require("../../services/dbService"));
exports.default = {
    query,
    getById,
    add,
    update,
};
function query(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `SELECT * FROM chat WHERE chat.userId = ${userId} OR chat.userId2 = ${userId}`;
            const chats = yield dbService_1.default.runSQL(query);
            return chats;
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
function getById(chatId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
function add(chat) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sqlCmd = `INSERT INTO chat (userId, userId2, messages, reactions,createdAt) 
  VALUES (${chat.userId},
          ${chat.userId2},
          '${chat.messages}',
          '${chat.reactions}',
          ${chat.createdAt})`;
            const okPacket = yield dbService_1.default.runSQL(sqlCmd);
            const lastInserted = yield dbService_1.default.runSQL(`SELECT * from chat where chat.id = ${okPacket.insertId}`);
            console.log(lastInserted);
            return lastInserted[0];
        }
        catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    });
}
function update(chat) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `UPDATE chat set 
                          userId = ${chat.userId},
                          userId2 = ${chat.userId2},
                          createdAt = ${chat.createdAt},
                          messages = '${chat.messages}'
                   WHERE chat.id = ${chat.id}`;
            const okPacket = yield dbService_1.default.runSQL(query);
            const lastInserted = yield dbService_1.default.runSQL(`SELECT * from chat where chat.id = ${chat.id}`);
            return lastInserted[0];
        }
        catch (err) {
            console.log(err);
            throw new Error(err.message);
        }
    });
}
