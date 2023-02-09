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
const bcrypt_1 = __importDefault(require("bcrypt"));
const userService_1 = __importDefault(require("../user/userService"));
exports.default = {
    login,
    signup,
};
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userService_1.default.getByEmail(email);
            const match = yield bcrypt_1.default.compare(password, user.password);
            if (!match)
                throw new Error('Invalid userName or password');
            delete user.password;
            return user;
        }
        catch (err) {
            throw new Error('Invalid username or password');
        }
    });
}
function signup(email, password, fullname) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!email || !password || !fullname)
                return Promise.reject('fullName, userName or password are required!');
            const saltRounds = 10;
            const hash = yield bcrypt_1.default.hash(password, saltRounds);
            return yield userService_1.default.add({ email, password: hash, fullname });
        }
        catch (err) {
            throw new Error('Invalid username or password');
        }
    });
}
