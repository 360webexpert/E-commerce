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
exports.getCategories = exports.createCategory = void 0;
const productcategorymodels_1 = __importDefault(require("../models/productcategorymodels"));
// Create categories
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const category = new productcategorymodels_1.default({ name });
        const savedCategory = yield category.save();
        res.status(201).json({ message: 'Category created successfully', category: savedCategory });
        return savedCategory;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating category', error: error.message });
        return null;
    }
});
exports.createCategory = createCategory;
// get categories
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield productcategorymodels_1.default.find().populate('products');
        res.status(200).json(categories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
});
exports.getCategories = getCategories;
