"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// authRoutes.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const rateLimiter_1 = require("../middlewares/rateLimiter");
const router = (0, express_1.Router)();
router.post('/register', rateLimiter_1.rateLimiterMiddleware, authController_1.register);
router.post('/login', rateLimiter_1.rateLimiterMiddleware, authController_1.login);
router.get('/verifyemail', rateLimiter_1.rateLimiterMiddleware, authController_1.verifyEmail);
router.post('/logout', rateLimiter_1.rateLimiterMiddleware, authController_1.logout);
exports.default = router;
