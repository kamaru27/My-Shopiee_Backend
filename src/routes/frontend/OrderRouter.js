import express from 'express';
import { orderDetails } from '../../controllers/frontend/OrderController.js';

export const orderRouter = express.Router();

orderRouter.post('/', orderDetails);