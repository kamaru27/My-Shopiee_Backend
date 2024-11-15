import express from 'express';
import { brandRouter } from '../BrandRouter.js';
import { categoryRouter } from '../CategoryRouter.js';
import { productRouter } from '../ProductRouter.js';
import { adminRouter } from '../AuthRouter.js';
import { bannerRouter } from '../BannerRouter.js';
import { dashboardHomeRouter } from '../DashboardHomeRouter.js';
import { orderRouter } from '../OrderRouter.js';
// import { adminAuthMiddleware } from '../../../Middleware/adminAuthMiddleware.js';

export const dashboardRoutes = express.Router();

dashboardRoutes.use('/brands',brandRouter);

dashboardRoutes.use('/banners',bannerRouter);

dashboardRoutes.use('/categories',categoryRouter);

dashboardRoutes.use('/products',productRouter);

dashboardRoutes.use('/home',dashboardHomeRouter);

dashboardRoutes.use('/orders',orderRouter);

// dashboardRoutes.use('/brands',adminAuthMiddleware,brandRouter);

// dashboardRoutes.use('/banners',adminAuthMiddleware,bannerRouter);

// dashboardRoutes.use('/categories',adminAuthMiddleware,categoryRouter);

// dashboardRoutes.use('/products',adminAuthMiddleware,productRouter);

dashboardRoutes.use('/admin',adminRouter);
