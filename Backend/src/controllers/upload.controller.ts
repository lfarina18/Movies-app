import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import Movie from '../models/movie';
import { convertCsvToJson } from '../helpers/convertCsvToJson';
import { CapitalizedArray } from '../helpers/CapitalizeFunction';
import { uploadFile } from '../helpers/uploadFile';
import * as fs from 'fs';

export const uploadMovies = async (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  const file = <UploadedFile>req.files.file;

  if (!file.mimetype.includes('csv')) {
    return res.status(400).json({ message: 'Only CSV files are allowed.' });
  }

  const pathFile = await uploadFile(file);

  if (pathFile) {
    try {
      const dataCsv = fs.readFileSync(`./uploads/${pathFile}`, 'utf8');
      if (!dataCsv.includes('titulo;genero;año;director;actores')) {
        return res.status(404).json("The file must contain the name of the columns: titulo;genero;año;director;actores");
      }
    } catch (error) {
      console.log(error);
    }
  }

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
