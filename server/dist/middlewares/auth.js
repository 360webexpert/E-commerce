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
exports.authMiddleware = void 0;
const jwt_1 = require("../utils/jwt");
const user_1 = __importDefault(require("../models/user"));
const authMiddleware = (role) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const token = authHeader.split(' ')[1];
        try {
            const decoded = (0, jwt_1.verifyToken)(token);
            const user = yield user_1.default.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            if (user.role !== role) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = user;
            next();
        }
        catch (err) {
            res.status(401).json({ message: 'Invalid token' });
        }
    });
};
exports.authMiddleware = authMiddleware;
