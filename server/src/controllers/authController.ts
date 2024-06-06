import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/user';
import { generateToken, verifyToken } from '../utils/jwt';
import { sendVerificationEmail } from '../utils/email';
import { Types } from 'mongoose';

// Register a new user
export const register = async (req: Request, res: Response) => {
    const { email, password, role } = req.body;
    console.log(req.body,'okkkkkk')
  
    if (!email || !password || !role) {
      return res.status(400).json({ message: 'Email, password, and role are required' });
    }
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        password: hashedPassword,
        role,
        isVerified: false,
      });
  
      await newUser.save();
  
      const token = generateToken({ id: (newUser._id as Types.ObjectId).toString(), role: newUser.role });
      await sendVerificationEmail(email, token);
      res.status(201).json({ message: 'User registered. Check your email for verification link.' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Log in an existing user
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' }); 
    }
  
    if (!user.isVerified) {
      return res.status(403).json({ message: 'Email not verified' }); 
    }
  
    const token = generateToken({ id: (user._id as Types.ObjectId).toString(), role: user.role });
    res.status(200).json({ message: 'Login successful', token }); 
};


// Verify user email
export const verifyEmail = async (req: Request, res: Response) => {
    const { token } = req.query;
  
    try {
      const decoded = verifyToken(token as string);
      const user = await User.findById(decoded.id);
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid token' });
      }
  
      user.isVerified = true;
      await user.save();
  
      res.status(200).json({ message: 'Email verified successfully' });
    } catch (err) {
      console.error('Error verifying email:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

// Logout user (optional)
export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logged out' });
};
