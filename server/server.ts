import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan'
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

import productRoutes from './src/routes/productRoutes';
import categoryRoutes from './src/routes/productcategoryRoutes';
import authRoutes from './src/routes/authRoutes';
import ordersRoutes from "./src/routes/orderRoutes"



require('dotenv').config();


const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(morgan('dev'));


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
  // useNewUrlParser: true as any,
  // useUnifiedTopology: true,

})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


// const path = require("path");
app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"));


// Routes Define
app.use('/api/products', productRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/category', categoryRoutes);
app.use('/api', authRoutes);
app.use('/api/order', ordersRoutes)

app.set('trust proxy', true);


app.use((req: Request, res: Response, next) => {
  const error: any = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(error.status || 500);
  res.json({ message: error.message });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





