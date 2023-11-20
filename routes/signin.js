import { Router } from 'express';
import { login } from '../controllers/users.js';
import validation from '../middlewares/validation.js';

const { signinValidation } = validation;
const signinRoute = Router();

signinRoute.post('/', signinValidation, login);

export default signinRoute;
