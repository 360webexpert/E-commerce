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
exports.logout = exports.verifyEmail = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const uuid_1 = require("uuid");
const user_1 = __importDefault(require("../models/user"));
const jwt_1 = require("../utils/jwt");
const email_1 = require("../utils/email");
// Register a new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = {
        id: (0, uuid_1.v4)(),
        email,
        password: hashedPassword,
        role,
        isVerified: false,
    };
    user_1.default.push(newUser);
    const token = (0, jwt_1.generateToken)({ id: newUser.id, role: newUser.role });
    yield (0, email_1.sendVerificationEmail)(email, token);
    res.status(201).json({ message: 'User registered. Check your email for verification link.' });
});
exports.register = register;
// Log in an existing user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = user_1.default.find((u) => u.email === email);
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (!user.isVerified) {
        return res.status(403).json({ message: 'Email not verified' });
    }
    const token = (0, jwt_1.generateToken)({ id: user.id, role: user.role });
    res.status(200).json({ token });
});
exports.login = login;
// Verify user email
const verifyEmail = (req, res) => {
    const { token } = req.query;
    try {
        const decoded = verifyToken(token);
        const user = user_1.default.find((user) => user.id === decoded.id);
        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        user.isVerified = true;
        res.status(200).json({ message: 'Email verified' });
    }
    catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};
exports.verifyEmail = verifyEmail;
// Logout user (optional)
const logout = (req, res) => {
    res.status(200).json({ message: 'Logged out' });
};
exports.logout = logout;
