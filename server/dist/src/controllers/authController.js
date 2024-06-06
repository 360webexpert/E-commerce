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
const user_1 = __importDefault(require("../models/user"));
const jwt_1 = require("../utils/jwt");
const email_1 = require("../utils/email");
// Register a new user
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    console.log(req.body, 'okkkkkk');
    if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email, password, and role are required' });
    }
    try {
        const existingUser = yield user_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = new user_1.default({
            email,
            password: hashedPassword,
            role,
            isVerified: false,
        });
        yield newUser.save();
        const token = (0, jwt_1.generateToken)({ id: newUser._id.toString(), role: newUser.role });
        yield (0, email_1.sendVerificationEmail)(email, token);
        res.status(201).json({ message: 'User registered. Check your email for verification link.' });
    }
    catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.register = register;
// Log in an existing user
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (!user.isVerified) {
        return res.status(403).json({ message: 'Email not verified' });
    }
    const token = (0, jwt_1.generateToken)({ id: user._id.toString(), role: user.role });
    res.status(200).json({ message: 'Login successful', token });
});
exports.login = login;
// Verify user email
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    try {
        const decoded = (0, jwt_1.verifyToken)(token);
        const user = yield user_1.default.findById(decoded.id);
        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }
        user.isVerified = true;
        yield user.save();
        res.status(200).json({ message: 'Email verified successfully' });
    }
    catch (err) {
        console.error('Error verifying email:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.verifyEmail = verifyEmail;
// Logout user (optional)
const logout = (req, res) => {
    res.status(200).json({ message: 'Logged out' });
};
exports.logout = logout;
