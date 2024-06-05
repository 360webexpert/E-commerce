// authRoutes.ts
import { Router } from 'express';
import { register, login, verifyEmail, logout } from '../controllers/authController';
import { rateLimiterMiddleware } from '../middlewares/rateLimiter';

const router = Router();

router.post('/register', rateLimiterMiddleware, register);
router.post('/login', rateLimiterMiddleware, login);
router.get('/verifyemail', rateLimiterMiddleware, verifyEmail);
router.post('/logout', rateLimiterMiddleware, logout);

export default router;
