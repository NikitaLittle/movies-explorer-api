import mongoose from 'mongoose';
import Movie from '../models/movie.js';
import Forbidden from '../errors/Forbidden.js';
import BadRequest from '../errors/BadRequest.js';
import NotFound from '../errors/NotFound.js';
import { ok, created, noContent } from '../utils/constants.js';

const getMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((movies) => {
      res.status(ok).send(movies);
    })
    .catch((err) => {
      if (err instanceof mongoose.Document.DocumentNotFoundError) {
        next(new NotFound('Фильм с указанным _id не найден.'));
      } else {
        next(err);
      }
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEU,
  } = req.body;
  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEU,
  })
    .then((newMovie) => {
      res.status(created).send(newMovie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные в методы создания фильма.'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const { user } = req;

  Movie.findById(_id)
    .then((movie) => {
      if (!movie.owner.equals(user._id)) {
        throw new Forbidden('Фильм не ваш.');
      }

      Movie.deleteOne(movie._id)
        .orFail()
        .then(() => {
          res.status(noContent).send('Фильм удален.');
        })
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные в методы удаления фильма.'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Фильм с указанным _id не найден.'));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Переданы некорректные данные в методы удаления фильма.'));
      } else {
        next(err);
      }
    });
};

export { getMovies, createMovie, deleteMovie };
