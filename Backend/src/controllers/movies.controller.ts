import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import Movie from '../models/movie';
import { convertCsvToJson } from '../helpers/convertCsvToJson';

export const getMovies = async (req: Request, res: Response) => {
  const movies = await Movie.findAll();

  res.json(movies);
};

export const uploadMovies = async (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  const file = <UploadedFile>req.files.file;

  if (!file.mimetype.includes('csv')) {
    return res.status(400).json({ message: 'Only CSV files are allowed.' });
  }

  const archive = convertCsvToJson(file);

  try {
    await Movie.bulkCreate(archive);
    res.status(200).json(archive);
  } catch (error) {
    res.status(500).json('There was an error saving the movie catalog in the database. Talk to the administrator.');
    console.log(error);
  }

};
