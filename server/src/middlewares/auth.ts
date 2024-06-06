import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User, { IUser } from '../models/user';
interface AuthenticatedRequest extends Request {
  user?: IUser;
}
export const authMiddleware = (role: 'customer' | 'admin') => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = verifyToken(token) as { id: string; role: string };
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      if (user.role !== role) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  };
};
