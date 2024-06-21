import { Request, Response } from "express";
import path from "path";
import fs from 'fs';
import Product from '../models/productModel';
import Category from '../models/productcategorymodels';
import Cart from "../models/cartmodel";
import User,{IUser} from "../models/user";
import {IWishlistUser} from "../models/wishlistmodel"
import mongoose from "mongoose";


// Create a new product
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, category, color, size,quantity, sku } = req.body;
        if (!req.files) {
            return res.status(400).json({ message: 'Image file is required' });
        }
        // const image = req.file.path;
        const images = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => file.path);

        let categoryDoc;
        if (mongoose.Types.ObjectId.isValid(category)) {
            categoryDoc = await Category.findById(category);
        } else {
            categoryDoc = await Category.findOne({ name: category });
        }

        if (!categoryDoc) {
            // Handle case where category is not found
            return res.status(404).json({ message: 'Category not found' });
        }

        const product = new Product({ name, description, price, category: categoryDoc._id, images, color, size,  quantity, sku});
        const savedProduct = await product.save();

        categoryDoc.products.push(savedProduct._id);
        await categoryDoc.save();

        res.status(201).json({
            message: 'Product created successfully',
            product: savedProduct

        });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};



// Get all products
export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ message: 'Error retrieving products', error: error.message });
    }
};



// Get a product by ID
export const getProductById = async (req: Request, res: Response) => {
    console.log(req.params.id, ' req.params.id; req.params.id; req.params.id; req.params.id;')
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate('category');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error: any) {
        console.error('Error retrieving product by ID:', error);
        res.status(500).json({ message: 'Error retrieving product', error: error.message });
    }
};



// Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { name, description, price, category, color, size,quantity, sku  } = req.body;
        // const image = req.file ? req.file.path : undefined;
        const images = req.files ? (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => file.path) : undefined;


        // Check if the product ID is valid
        if (!req.params.id) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        // Find the product by ID and update its fields
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category, ...(images && { images }), color, size,quantity, sku },
            { new: true }
        );

        // Check if the product exists
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({
            message: 'Product updated successfully',
            product: updatedProduct
        });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};



// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
    console.log(`Deleting product with ID: ${req.params.id}`);

    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        // Delete the image file
        // fs.unlinkSync(path.resolve(product.images));
        product.images.forEach(imagePath => {
            fs.unlinkSync(path.resolve(imagePath));
        });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};



// Serve the image
export const getProductImage = (req: Request, res: Response) => {
    const imagePath = path.resolve(`./uploads/${req.params.filename}`);
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ message: 'Image not found' });
        }
        res.sendFile(imagePath);
    });
};



interface MyRequest extends Request {
    user?: IUser;
}

//add to cart
export const addToCart = async (req: MyRequest, res: Response) => {
    try {
        const productId = req.body.productId; // Assuming productId is sent in the request body
        const userId = req.user?._id; // Retrieve user ID from the request object

        // Check if userId is not undefined
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        // Find or create a cart for the current user
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // If the cart doesn't exist, create a new one
            cart = new Cart({ user: userId, products: [] });
        }

        // Add the productId to the cart
        cart.products.push(productId);

        // Save the updated cart to the database
        await cart.save();

        res.status(200).json({ success: true, message: 'Product added to cart successfully' });
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).json({ success: false, message: 'Error adding product to cart' });
    }
};

export const addToWishlist = async (req: MyRequest, res: Response) => {
    try {
        const productId = req.body.productId;
        const userId = req.user?._id;

        const user = await User.findById(userId).select('+wishlist') as IWishlistUser; // Ensure wishlist is selected
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Add the product to the user's wishlist
        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }

        res.status(200).json({ success: true, message: 'Product added to wishlist successfully' });
    } catch (err) {
        console.error('Error adding product to wishlist:', err);
        res.status(500).json({ success: false, message: 'Error adding product to wishlist' });
    }
};