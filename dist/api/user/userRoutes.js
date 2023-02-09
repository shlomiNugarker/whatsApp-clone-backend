"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("./userController"));
const validateToken_1 = require("../../middlewares/validateToken");
const { validateToken } = validateToken_1.jwtService;
const router = express_1.default.Router();
router.get('/', validateToken, userController_1.default.query);
router.put('/:id', validateToken, userController_1.default.updateUser);
router.get('/email/:email', validateToken, userController_1.default.getUserByEmail);
router.get('/userId/:userId', validateToken, userController_1.default.getUserByUserId);
router.post('/', validateToken, userController_1.default.addUser);
exports.default = router;
