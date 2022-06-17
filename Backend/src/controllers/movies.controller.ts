import { Request, Response } from 'express';

export const getMovies = (req: Request, res: Response) => {
  res.json({
    msg: 'getMovies',
  });
};

export const postMovies = (req: Request, res: Response) => {

    const { body } = req;

  res.json({
    msg: 'PostMovies',
    body
  });
};
