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
    add,
    getByEmail,
    getByUserId,
    getUsers,
    update,
};
function add({ email, password, fullname }) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sqlCmd = `INSERT INTO user (email,password,fullName) 
    VALUES ("${email}","${password}","${fullname}")`;
            const okPacket = yield dbService_1.default.runSQL(sqlCmd);
            const lastInserted = yield dbService_1.default.runSQL(`SELECT * from user where user.id = ${okPacket.insertId}`);
            return lastInserted[0];
        }
        catch (err) {
            console.log('cannot insert user', err);
            throw new Error(err.message);
        }
    });
}
function getUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sqlCmd = `SELECT * FROM user`;
            const users = yield dbService_1.default.runSQL(sqlCmd);
            return users;
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
function getByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sqlCmd = `SELECT * FROM user WHERE email = '${email}'`;
            const users = yield dbService_1.default.runSQL(sqlCmd);
            if (users.length === 1)
                return users[0];
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
function getByUserId(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const sqlCmd = `SELECT * FROM user WHERE id = '${userId}'`;
            const users = yield dbService_1.default.runSQL(sqlCmd);
            if (users.length === 1)
                return users[0];
        }
        catch (err) {
            throw new Error(err.message);
        }
    });
}
function update(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `UPDATE user SET
                          fullname = "${user.fullname}",
                          imgUrl = "${user.imgUrl}",
                          email = "${user.email}",
                          contacts = "${user.contacts}",
                          about = "${user.about}"
                  WHERE user.id = "${user.id}"`;
            const okPacket = yield dbService_1.default.runSQL(query);
            if (okPacket.affectedRows !== 0) {
                const lastInserted = yield dbService_1.default.runSQL(`SELECT * from user where user.id = ${user.id}`);
                delete lastInserted[0].password;
                return lastInserted[0];
            }
        }
        catch (err) {
            console.log(`cannot update user ${user._id}`, err);
            throw err;
        }
    });
}
