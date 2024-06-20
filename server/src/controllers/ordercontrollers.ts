// import { Request, Response } from "express";
// import Order from '../models/orderModel';
// // Receive New Order Notifications
// export const receiveNewOrderNotifications = async (req: Request, res: Response) => {
//     try {
//         console.log("Receiving new order notification...");

//         const { customerName, products } = req.body;

//         if (!customerName || !products || !products.length) {
//             console.log("Missing required fields: customerName or products");
//             return res.status(400).json({ message: 'Customer name and products are required' });
//         }

//         const newOrder = new Order({ customerName, products });
//         await newOrder.save();
//         console.log("Order created successfully:", newOrder);

//         res.status(201).json({ message: 'Order created successfully', order: newOrder });
//     } catch (error: any) {
//         console.error('Error creating order:', error);
//         res.status(500).json({ message: 'Error creating order', error: error.message });
//     }
// };

// // Get Order Details
// export const getOrderDetail = async (req: Request, res: Response) => {
//     try {
//         console.log("Fetching order details...");

//         const orderId = req.params.id;
//         const order = await Order.findById(orderId).populate('products');
//         if (!order) {
//             console.log("Order not found:", orderId);
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         console.log("Order details retrieved successfully:", order);
//         res.status(200).json(order);
//     } catch (error: any) {
//         console.error('Error retrieving order:', error);
//         res.status(500).json({ message: 'Error retrieving order', error: error.message });
//     }
// };

// // Update Order Status
// export const updateOrderStatus = async (req: Request, res: Response) => {
//     try {
//         console.log("Updating order status...");

//         const { status } = req.body;
//         const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
//         if (!updatedOrder) {
//             console.log("Order not found:", req.params.id);
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         console.log("Order updated successfully:", updatedOrder);
//         res.status(200).json({ message: 'Order updated successfully', order: updatedOrder });
//     } catch (error: any) {
//         console.error('Error updating order:', error);
//         res.status(500).json({ message: 'Error updating order', error: error.message });
//     }
// };


import { Request, Response } from 'express';
import Order, { IOrder } from '../models/orderModel';
import User, { IUser } from '../models/user';

// Create a new order
export const createOrder = async (req: Request, res: Response) => {
    try {
        const { userId, products, totalAmount } = req.body;

        // Check if the user exists
        const user: IUser | null = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the order
        const order: IOrder = new Order({ userId, products, totalAmount });
        const savedOrder: IOrder = await order.save();

        res.status(201).json(savedOrder);
    } catch (error:any) {
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

// Get all orders
export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders: IOrder[] = await Order.find();
        res.status(200).json(orders);
    } catch (error:any) {
        res.status(500).json({ message: 'Error retrieving orders', error: error.message });
    }
};

// Get an order by ID
export const getOrderById = async (req: Request, res: Response) => {
    try {
        const orderId: string = req.params.id;
        const order: IOrder | null = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error:any) {
        res.status(500).json({ message: 'Error retrieving order', error: error.message });
    }
};

// Update an order by ID
export const updateOrder = async (req: Request, res: Response) => {
    try {
        const orderId: string = req.params.id;
        const { status } = req.body;
        const updatedOrder: IOrder | null = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error:any) {
        res.status(500).json({ message: 'Error updating order', error: error.message });
    }
};

// Delete an order by ID
export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const orderId: string = req.params.id;
        const deletedOrder: IOrder | null = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error:any) {
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    }
};