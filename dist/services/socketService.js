"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    connectSockets,
};
let gIo;
function connectSockets(http, _session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
            pingTimeout: 60000,
        },
    });
    gIo.on('connection', (socket) => { });
}
