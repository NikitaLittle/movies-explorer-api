import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import BadRequest from '../errors/BadRequest.js';
import NotFound from '../errors/NotFound.js';
import Conflict from '../errors/Conflict.js';
import { ok, created } from '../utils/constants.js';

const { NODE_ENV, JWT_SECRET } = process.env;

const getUserInfo = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      res.status(ok).send(user);
    })
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { email, name }, { new: true, runValidators: true })
    .orFail()
    .then((user) => {
      res.status(ok).send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(err.message));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Пользователь с указанным _id не найден.'));
      } else {
        next(err);
      }
    });
};

const register = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      email,
      password: hash,
      name,
    })
      .then((user) => {
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        res.status(created).send(userWithoutPassword);
      })
      .catch((err) => {
        if (err.code === 11000) {
          next(new Conflict('Переданы некорректные данные в методы создания пользователя'));
        } else if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequest(err.message));
        } else {
          next(err);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.status(ok).send({ token });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest(err.message));
      } else {
        next(err);
      }
    });
};

export {
  getUserInfo, updateUserInfo, register, login,
};
