import mongoose from 'mongoose';
import Movie from '../models/movie.js';
import Forbidden from '../errors/Forbidden.js';
import BadRequest from '../errors/BadRequest.js';
import NotFound from '../errors/NotFound.js';
import { ok, created, noContent } from '../utils/constants.js';

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.status(ok).send(movies);
    })
    .catch(next);
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
        next(new NotFound(err.message));
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
        throw new Forbidden('Карточка не ваша.');
      }

      Movie.deleteOne(movie._id)
        .orFail()
        .then(() => {
          res.status(noContent).send({ message: 'Фильм удален.' });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest('Переданы некорректные данные для удаления карточки.'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFound('Карточка с указанным _id не найдена.'));
      } else {
        next(err);
      }
    });
};

export { getMovies, createMovie, deleteMovie };
