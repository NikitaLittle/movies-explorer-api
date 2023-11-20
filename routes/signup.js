import { Router } from 'express';
import { register } from '../controllers/users.js';
import validation from '../middlewares/validation.js';

const { signupValidation } = validation;
const signupRoute = Router();

signupRoute.post('/', signupValidation, register);

export default signupRoute;
