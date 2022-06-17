import path from 'path';
import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import Movie from '../models/movie';

export const getMovies = async (req: Request, res: Response) => {
  const movies = await Movie.findAll();

  res.json(movies);
};

export const uploadMovies = (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  const file = <UploadedFile>req.files.file;
  
  if (!file.mimetype.includes('csv')) {
    return res.status(400).json({ message: 'Only CSV files are allowed.' });
  }
  
  const fileReplace = file.name.replace(/\s/g, '-').toLowerCase();

  const uploadPath = path.join(__dirname, '../../uploads/', fileReplace);

  file.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.json({ message: `File uploaded to ${uploadPath}` });
  });
};
