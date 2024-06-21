import express from 'express';
import { createCategory, getCategories,searchCategories} from '../controllers/productcateoryController';

const router = express.Router();

router.post('/categories', createCategory);
router.get('/categories', getCategories);
router.get('/categories/search', searchCategories);

export default router;
