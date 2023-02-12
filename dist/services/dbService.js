"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
exports.default = {
    runSQL,
};
// const connection = mysql.createConnection({
//   host: 'localhost',
//   port: 3306,
//   user: 'root',
//   password: '',
//   database: 'whatsapp_db',
//   insecureAuth: true,
// })
let pool;
function handleDisconnect() {
    setTimeout(() => {
        pool = mysql_1.default.createPool({
            host: process.env.HOST_DB,
            port: 3306,
            user: process.env.USER_DB,
            password: process.env.PASSWORD_DB,
            database: process.env.DATABASE_DB,
            insecureAuth: true,
        });
        pool.on('connection', function (connection) {
            console.log('DB Connection established');
            connection.on('error', function (err) {
                console.error(new Date(), 'MySQL error', err.code);
            });
            connection.on('close', function (err) {
                console.error(new Date(), 'MySQL close', err);
            });
        });
    });
}
function runSQL(sqlCommand) {
    return new Promise((resolve, reject) => {
        pool.query(sqlCommand, function (error, results, fields) {
            if (error)
                reject(error);
            else
                resolve(results);
        });
    });
}
handleDisconnect();
