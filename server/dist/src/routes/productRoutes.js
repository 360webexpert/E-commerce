"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = require("../controllers/productsController");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path_1.default.join(__dirname, '../uploads', filename);
    res.sendFile(filepath);
});
router.post('/', upload.single('image'), productsController_1.createProduct);
router.get('/', productsController_1.getProducts);
router.get('/get/:id', productsController_1.getProductById);
router.put('/update/:id', upload.single('image'), productsController_1.updateProduct);
router.delete('delete/:id', productsController_1.deleteProduct);
router.get('/image/:image', productsController_1.getProductImage);
exports.default = router;
