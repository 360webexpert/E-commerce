import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan'
import { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import productRoutes from './src/routes/productRoutes';
import categoryRoutes from './src/routes/productcategoryRoutes';



dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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



// Routes Define
app.use('/api/products', productRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/category', categoryRoutes);


app.use((req: Request, res: Response, next) => {
  const error: any = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(error.status || 500);
  res.json({ message: error.message });
});


app.get('/', (req, res) => {
  res.send('API WORKING');
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



