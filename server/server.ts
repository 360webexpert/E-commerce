// server.ts
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/authRoutes';

dotenv.config();
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
app.set('view engine', 'ejs')
app.set("views",path.join(__dirname, "views"));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce')
  .then(() => console.log('MongoDB connected'))
  .catch((err: any) => console.error(err));

app.use(express.json());
app.use(cors());
app.use('/api', authRoutes);
app.set('trust proxy', true);
app.get('/', (req, res) => {
  res.send('API WORKING');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
