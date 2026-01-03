import { Router } from 'express';
import { getMe } from '../controllers/user.controller.js';
import protect from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/me', protect, getMe);

export default userRouter;
