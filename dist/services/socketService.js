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
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
exports.default = {
    connectSockets,
};
let gIo;
class mySocket extends socket_io_1.Socket {
    constructor() {
        super(...arguments);
        this.userId = null;
    }
}
function connectSockets(http, _session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
            pingTimeout: 60000,
        },
    });
    gIo.on('connection', (socket) => {
        // console.log('connection with socketId ', socket.id)
        socket.on('login', (user) => __awaiter(this, void 0, void 0, function* () {
            socket.userId = user.id;
        }));
        socket.on('logout', (user) => { });
        socket.on('update-chat', ({ chat, emitTo }) => __awaiter(this, void 0, void 0, function* () {
            sendUpdatedChat(chat, emitTo);
        }));
        socket.on('add-chat', ({ chat, emitTo }) => __awaiter(this, void 0, void 0, function* () {
            sendAddedChat(chat, emitTo);
        }));
        socket.on('disconnect', (args) => __awaiter(this, void 0, void 0, function* () {
            // console.log('disconnect with socket.userId: ', socket.userId)
        }));
    });
}
function getAllSockets() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!gIo)
            return;
        const sockets = yield gIo.fetchSockets();
        return sockets;
    });
}
function sendUpdatedChat(chat, emitTo) {
    return __awaiter(this, void 0, void 0, function* () {
        const socket = yield findUserSocket(emitTo);
        if (!socket)
            return;
        socket.emit('chat-updated', { chat });
    });
}
function sendAddedChat(chat, emitTo) {
    return __awaiter(this, void 0, void 0, function* () {
        const socket = yield findUserSocket(emitTo);
        if (!socket)
            return;
        socket.emit('chat-added', { chat });
    });
}
function findUserSocket(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const sockets = yield gIo.fetchSockets();
        const socket = sockets.find((socket) => socket.userId === userId);
        return socket;
    });
}
