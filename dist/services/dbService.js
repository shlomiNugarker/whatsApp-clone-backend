"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
exports.default = {
    runSQL,
};
const connection = mysql_1.default.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'whatsapp_db',
    insecureAuth: true,
});
connection.connect((err) => {
    if (err)
        throw new Error('mySql failed connection');
    console.log('connected to SQL server');
});
function runSQL(sqlCommand) {
    return new Promise((resolve, reject) => {
        connection.query(sqlCommand, function (error, results, fields) {
            if (error)
                reject(error);
            else
                resolve(results);
        });
    });
}
