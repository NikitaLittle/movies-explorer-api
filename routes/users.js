import { Router } from 'express';
import { getUserInfo, updateUserInfo } from '../controllers/users.js';
import validation from '../middlewares/validation.js';

const { updateUserInfoValidation } = validation;
const userRoute = Router();

userRoute.get('/me', getUserInfo);
userRoute.patch('/me', updateUserInfoValidation, updateUserInfo);

export default userRoute;
