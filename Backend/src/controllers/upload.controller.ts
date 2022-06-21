import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import Movie from '../models/movie';
import { convertCsvToJson } from '../helpers/convertCsvToJson';
import { CapitalizedArray } from '../helpers/CapitalizeFunction';
import { uploadFile } from '../helpers/uploadFile';

export const uploadMovies = async (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  const file = <UploadedFile>req.files.file;

  if (!file.mimetype.includes('csv')) {
    return res.status(400).json({ message: 'Only CSV files are allowed.' });
  }

  const pathFile = await uploadFile(file);

  const jsonFile = convertCsvToJson(pathFile);

  const capitalizedArchive = CapitalizedArray(jsonFile);

  try {
    
    capitalizedArchive.forEach(async (movie) => {
      const movieExists = await Movie.findOne({
        where: { title: movie.title },
      });
      if (movieExists === null) {
        Movie.create(movie);
        
      }
    });
    res.status(200).json('Data were successfully saved');
  } catch (error) {
    res
      .status(500)
      .json(
        'There was an error saving the movie catalog in the database. Talk to the administrator.'
      );
    console.log(error);
  }
};
