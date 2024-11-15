import express from 'express';
import { homePage } from '../../controllers/frontend/HomePageController.js';

export const homePageRouter = express.Router();

homePageRouter.get('/',homePage);