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
router.use('/uploads', express.static(path.join(__dirname, '../uploads')));

router.get('/file/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '../uploads', filename);
    res.sendFile(filepath);
});


router.post('/', upload.array('images'), createProduct);
router.get('/', getProducts);
router.get('/getby/:id', getProductById);
router.put('/update/:id', upload.array('images'), updateProduct);
router.delete('/delete/:id', deleteProduct); 
router.get('/images/:filename', getProductImage);


export default router;