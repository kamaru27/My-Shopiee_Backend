import express from 'express';
import { getAllOrders, OrderStatus, OrderView } from '../../controllers/dashboard/OrderController.js';

export const orderRouter = express.Router();

orderRouter.get('/getAll',getAllOrders);

orderRouter.put('/status',OrderStatus);

orderRouter.get('/invoice/:orderId',OrderView);
