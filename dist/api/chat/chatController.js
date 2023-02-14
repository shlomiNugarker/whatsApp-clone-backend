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
const chatService_1 = __importDefault(require("./chatService"));
exports.default = { getChats, getChatById, addChat, updateChat };
function getChats(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { userId } = req.params;
            const chats = yield chatService_1.default.query(userId);
            res.json(chats);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to get chats' });
        }
    });
}
function getChatById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const chat = yield chatService_1.default.getById(id);
            res.json(chat);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to get chat' });
        }
    });
}
function addChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chat = req.body;
            const addedChat = yield chatService_1.default.add(chat);
            res.json(addedChat);
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to add chat' });
        }
    });
}
function updateChat(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const chat = req.body;
            const updatedChat = yield chatService_1.default.update(chat);
            res.json(updatedChat);
        }
        catch (err) {
            console.log(err);
            res.status(500).send({ err: 'Failed to update chat' });
        }
    });
}
