// import express from 'express';
// import { receiveNewOrderNotifications,getOrderDetail,updateOrderStatus} from '../controllers/ordercontrollers';
// import { authMiddleware } from './../middlewares/auth';
// const router = express.Router();
// router.post('/', receiveNewOrderNotifications);
// router.get('/:id', getOrderDetail);
// router.put('/:id', updateOrderStatus);

// export default router;


import express from 'express';
import {
    createOrder,
    getOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
} from '../controllers/ordercontrollers';

const router = express.Router();

// Create a new order
router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

export default router;
