import express from 'express';
import { categoryPage } from '../../controllers/frontend/CategoryPageController.js';

export const categoryPageRouter = express.Router();

categoryPageRouter.get('/',categoryPage);