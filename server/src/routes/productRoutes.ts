import express from 'express';
import {createProduct, getProducts, getProductById, updateProduct,deleteProduct, getProductImage} from '../controllers/productsController'
import multer from 'multer';
import path from 'path';



const router =express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });


router.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../uploads', filename);
    res.sendFile(filepath);
});


router.post('/', upload.single('image'), createProduct);
router.get('/', getProducts);
router.get('/product/:id', getProductById);
router.put('/update/:id', upload.single('image'), updateProduct);
router.delete('/:id', deleteProduct);
router.get('/image/:image', getProductImage);


export default router;