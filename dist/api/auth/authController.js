"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const authService_1 = __importDefault(require("./authService"));
const jwt = __importStar(require("jsonwebtoken"));
const userService_1 = __importDefault(require("../user/userService"));
exports.default = { login, signup, logout, verifyToken };
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield authService_1.default.login(email, password);
            // jwt:
            const accessToken = jwt.sign({ email: user.email, id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '24h' });
            res.cookie('accessToken', accessToken, {
                maxAge: 60 * 1000 * 60 * 24,
                httpOnly: true,
            });
            res.json({ user, accessToken });
        }
        catch (err) {
            console.log('Failed to Login ' + err);
            res.status(401).send({ err: 'Failed to Login' });
        }
    });
}
function signup(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password, fullname } = req.body;
            const isUserExist = yield userService_1.default.getByEmail(email);
            if (isUserExist)
                throw new Error('Failed to signup ');
            yield authService_1.default.signup(email, password, fullname);
            // const user = await authService.login(email, password)
            res.status(200);
            res.send({ msg: 'Sign up successfully' });
        }
        catch (err) {
            console.log('Failed to signup ' + err);
            res.status(500).send({ err: 'Failed to signup' });
        }
    });
}
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.clearCookie('accessToken');
            res.send({ msg: 'Logged out successfully' });
            res.end();
        }
        catch (err) {
            res.status(500).send({ err: 'Failed to logout' });
        }
    });
}
function verifyToken(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let { accessToken } = req.body;
            const validToken = jwt.verify(accessToken, process.env.TOKEN_SECRET);
            if (validToken)
                res.send({ isValidToken: true });
            else
                res.status(500).send({ isValidToken: false });
        }
        catch (err) {
            res.status(500).send({ isValidToken: false });
        }
    });
}
