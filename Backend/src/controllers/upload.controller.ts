import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import Movie from '../models/movie';
import { convertCsvToJson } from '../helpers/convertCsvToJson';
import { CapitalizedArray } from '../helpers/CapitalizeFunction';
import { uploadFile } from '../helpers/uploadFile';
import * as fs from 'fs';

export const uploadMovies = async (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res
      .status(400)
      .json({ message: 'No hay ningún archivo cargado...' });
  }

  const file = <UploadedFile>req.files.file;

  if (!file.mimetype.includes('csv')) {
    return res
      .status(400)
      .json({ message: 'Sólo se permiten archivos con extensión CSV.' });
  }

  const pathFile = await uploadFile(file);

  if (pathFile) {
    try {
      const dataCsv = fs.readFileSync(`./uploads/${pathFile}`, 'utf8');
      if (
        !dataCsv.toLowerCase().includes('titulo;genero;año;director;actores')
      ) {
        return res.status(404).json({
          message:
            'El nombre de las columnas deben ser: titulo; genero; año; director; actores',
        });
      }
    } catch (error) {
      res.status(500).json({
        message:
          'Se ha producido un error, por favor comuniquese con el administrador.',
      });
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

    res
      .status(200)
      .json({ message: `La operación fue realizada con éxito :)` });
  } catch (error) {
    res.status(500).json({
      message: 'Ha habido un error. Habla con el administrador',
    });
    console.log(error);
  }
};
