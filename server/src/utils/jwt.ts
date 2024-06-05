import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || '73ab01da9061f705fd5b59d8a457bd5cbc74c7a84c67466a075d73c2836f7a02';

interface UserPayload {
    id: string;
    role: string;
  }
  
  export const generateToken = (user: UserPayload) => {
    return jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
  };
  
  export const verifyToken = (token: string): UserPayload => {
    return jwt.verify(token, secret) as UserPayload;
  };
