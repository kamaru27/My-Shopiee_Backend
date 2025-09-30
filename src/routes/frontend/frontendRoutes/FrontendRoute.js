import express from 'express';
import { homePageRouter } from '../HomePageRouter.js';
import { categoryPageRouter } from '../CategoryPageRouter.js';
import { userRouter } from '../UserRouter.js';
import { orderRouter } from '../OrderRouter.js';
import { bannerPageRouter } from '../BannerRouter.js';
import { productPageRouter } from '../ProductPageRouter.js';
import { userAuthMiddleware } from '../../../middleware/UserAuthMiddleware.js';

export const frontendRoutes = express.Router();

frontendRoutes.use('/home-page', homePageRouter);

frontendRoutes.use('/shop-page', categoryPageRouter);

frontendRoutes.use('/products-page', productPageRouter);

frontendRoutes.use('/carousel', bannerPageRouter);

frontendRoutes.use('/user', userRouter);

frontendRoutes.use('/order', userAuthMiddleware, orderRouter);
