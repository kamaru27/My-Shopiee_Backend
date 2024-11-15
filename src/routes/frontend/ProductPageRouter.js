import express from 'express';
import { productsByCategory } from '../../controllers/frontend/ProductsPageController.js';
import { singleProductPage } from '../../controllers/frontend/SingleProductController.js';
// import { singleProductPage } from '../../controllers/frontend/SingleProductPageController.js';

export const productPageRouter = express.Router();

productPageRouter.get('/productsByCategory/:categoryId', productsByCategory);

productPageRouter.get('/product/:productId', singleProductPage);
