import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import Movie from '../models/movie';
import { convertCsvToJson } from '../helpers/convertCsvToJson';
import { CapitalizedArray } from '../helpers/CapitalizeFunction';
import path from 'path';
import { uploadFile } from '../helpers/uploadFile';

export const uploadMovies = async (req: Request, res: Response) => {
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
    return res.status(400).json({ message: 'No files were uploaded.' });
  }

  const file = <UploadedFile>req.files.file;

  if (!file.mimetype.includes('csv')) {
    return res.status(400).json({ message: 'Only CSV files are allowed.' });
  }

  const pathFile = await uploadFile(file)

  const archive = convertCsvToJson(pathFile);
  
  
  res.json(archive);

  // const capitalizedArchive = CapitalizedArray(archive);

  // try {
  //   let count = 0;
  //   archive.forEach(async (movie) => {
  //     const movieExists = await Movie.findOne({ where: { title: movie.title } });
  //     if (movieExists === null) {
  //       Movie.create(movie);
  //       count = count + 1;
  //     }
  //   });
  //   res.status(200).json(`${count} new movies were added.`);
    
  // } catch (error) {
  //   res
  //   .status(500)
  //   .json(
  //       'There was an error saving the movie catalog in the database. Talk to the administrator.'
  //       );
  //       console.log(error);
  //     }
};