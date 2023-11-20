import { celebrate, Joi } from 'celebrate';
import { linkRegex } from '../utils/constants.js';

const validation = {
  signupValidation: celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        name: Joi.string().required().min(3).max(30),
      })
      .unknown(true),
  }),

  signinValidation: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),

  updateUserInfoValidation: celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      name: Joi.string().required().min(2).max(30),
    }),
  }),

  createMovieValidation: celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(linkRegex),
      trailerLink: Joi.string().required().pattern(linkRegex),
      thumbnail: Joi.string().required().pattern(linkRegex),
      movieId: Joi.number(),
      nameRU: Joi.string().required(),
      nameEU: Joi.string().required(),
    }),
  }),

  deleteMovieValidation: celebrate({
    params: Joi.object().keys({
      _id: Joi.string().hex().required(),
    }),
  }),
};

export default validation;
