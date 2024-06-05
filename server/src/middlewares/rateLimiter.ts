import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60,
});

export const rateLimiterMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.ip) {
      await rateLimiter.consume(req.ip.toString());
    } else {
      throw new Error('IP address not available');
    }
    next();
  } catch (error) {
    res.status(429).json({ message: 'Too Many Requests' });
  }
};