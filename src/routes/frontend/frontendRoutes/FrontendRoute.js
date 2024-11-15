import express from 'express';
import { homePageRouter } from '../HomePageRouter.js';
import { categoryPageRouter } from '../CategoryPageRouter.js';
import { userRouter } from '../UserRouter.js';
import { orderRouter } from '../OrderRouter.js';
import { bannerPageRouter } from '../BannerRouter.js';
import { productPageRouter } from '../ProductPageRouter.js';
import { userAuthMiddleware } from '../../../middleware/UserAuthMiddleware.js';

export const frontendRoutes = express.Router();

frontendRoutes.use('/homePage', homePageRouter);

frontendRoutes.use('/categoryPage', categoryPageRouter);

frontendRoutes.use('/productsPage', productPageRouter);

frontendRoutes.use('/bannerPage', bannerPageRouter);

frontendRoutes.use('/user', userRouter);

frontendRoutes.use('/order', userAuthMiddleware, orderRouter);
