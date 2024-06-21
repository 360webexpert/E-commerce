import { Request, Response } from 'express';
import Category, { ICategory } from '../models/productcategorymodels';

// Create categories
export const createCategory = async (req: Request, res: Response): Promise<ICategory | null> => {
    try {
        const { name } = req.body;
        const category = new Category({ name });
        const savedCategory = await category.save();
        res.status(201).json({ message: 'Category created successfully', category: savedCategory });
        return savedCategory;
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Error creating category', error: error.message });
        return null;
    }
};


// get categories
export const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find().populate('products');
        res.status(200).json(categories);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

export const searchCategories = async (req: Request, res: Response) => {
    const { q } = req.query;
    try {
        const categories = await Category.find({
            $or: [
                { name: { $regex: new RegExp(q as string, 'i') } }, // Search by category name
                { 'products.name': { $regex: new RegExp(q as string, 'i') } } // Search by product name
            ]
        }).populate('products');
        res.status(200).json(categories);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Error searching categories', error: error.message });
    }
};