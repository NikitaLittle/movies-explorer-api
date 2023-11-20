import { Router } from 'express';
import { getMovies, createMovie, deleteMovie } from '../controllers/movies.js';
import validation from '../middlewares/validation.js';

const { createMovieValidation, deleteMovieValidation } = validation;
const movieRoute = Router();

movieRoute.get('/', getMovies);
movieRoute.post('/', createMovieValidation, createMovie);
movieRoute.delete('/:_id', deleteMovieValidation, deleteMovie);

export default movieRoute;
