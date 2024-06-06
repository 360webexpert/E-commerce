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
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
const ejs = require('ejs');
dotenv_1.default.config(); // Make sure to load environment variables from .env file
const path = require("path");
const transporter = nodemailer_1.default.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
const sendVerificationEmail = (to, token) => __awaiter(void 0, void 0, void 0, function* () {
    const templatePath = path.join(__dirname, '../views/emailtemplate.ejs');
    const url = `http://localhost:${process.env.PORT}/api/verifyemail?token=${token}`;
    console.log(url, 'urlllll');
    try {
        const emailHTML = yield ejs.renderFile(templatePath, { url });
        const info = yield transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: 'Email Verification',
            html: emailHTML,
        });
        console.log('Email sent:', info.messageId);
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
