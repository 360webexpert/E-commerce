"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductImage = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const productModel_1 = __importDefault(require("../models/productModel"));
const productcategorymodels_1 = __importDefault(require("../models/productcategorymodels"));
const mongoose_1 = __importDefault(require("mongoose"));
// Create a new product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, category } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        const image = req.file.path;
        let categoryDoc;
        if (mongoose_1.default.Types.ObjectId.isValid(category)) {
            categoryDoc = yield productcategorymodels_1.default.findById(category);
        }
        else {
            categoryDoc = yield productcategorymodels_1.default.findOne({ name: category });
        }
        if (!categoryDoc) {
            // Handle case where category is not found
            return res.status(404).json({ message: 'Category not found' });
        }
        const product = new productModel_1.default({ name, description, price, category: categoryDoc._id, image });
        const savedProduct = yield product.save();
        categoryDoc.products.push(savedProduct._id);
        yield categoryDoc.save();
        res.status(201).json({
            message: 'Product created successfully',
            product: savedProduct
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
});
exports.createProduct = createProduct;
// Get all products
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield productModel_1.default.find();
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
});
exports.getProducts = getProducts;
// Get a product by ID
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.id, ' req.params.id; req.params.id; req.params.id; req.params.id;');
    try {
        const productId = req.params.id;
        const product = yield productModel_1.default.findById(productId).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error('Error retrieving product by ID:', error);
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
});
exports.getProductById = getProductById;
// Update a product by ID
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, price, category } = req.body;
        const image = req.file ? req.file.path : undefined;
        // Check if the product ID is valid
        if (!req.params.id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }
        // Find the product by ID and update its fields
        const updatedProduct = yield productModel_1.default.findByIdAndUpdate(req.params.id, Object.assign({ name, description, price, category }, (image && { image })), { new: true });
        // Check if the product exists
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Send success response with updated product details
        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
});
exports.updateProduct = updateProduct;
// Delete a product by ID
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield productModel_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Delete the image file
        fs_1.default.unlinkSync(path_1.default.resolve(product.image));
        res.status(200).json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
});
exports.deleteProduct = deleteProduct;
// Serve the image
const getProductImage = (req, res) => {
    const imagePath = path_1.default.resolve(`./uploads/${req.params.image}`);
    fs_1.default.access(imagePath, fs_1.default.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.sendFile(imagePath);
    });
};
exports.getProductImage = getProductImage;
