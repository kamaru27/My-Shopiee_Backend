import express from 'express';
import { createUser, updatePassword, userLogin } from '../../controllers/frontend/UserController.js';

export const userRouter = express.Router();

userRouter.post('/',createUser);

userRouter.post('/login',userLogin);

userRouter.post('/updatePassword',updatePassword);