import { Request, Response } from 'express';
import Movie from '../models/movie';

export const getMovies = async (req: Request, res: Response) => {
  const movies = await Movie.findAll();

  res.json(movies);
};
