import { Router } from 'express';
import signupRoute from './signup.js';
import signinRoute from './signin.js';
import userRoute from './users.js';
import movieRoute from './movies.js';
import auth from '../middlewares/auth.js';
import NotFound from '../errors/NotFound.js';

const appRoute = Router();

appRoute.use('/signup', signupRoute);
appRoute.use('/signin', signinRoute);

appRoute.use('/users', auth, userRoute);
appRoute.use('/movies', auth, movieRoute);

appRoute.use('*', auth, (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});

export default appRoute;
