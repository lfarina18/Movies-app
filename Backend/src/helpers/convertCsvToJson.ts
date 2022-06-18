import path from 'path';
import { UploadedFile } from 'express-fileupload';
import { response } from 'express';
const csvToJson = require('convert-csv-to-json');

type MovieType = {
  titulo: string;
  genero: string;
  año: number;
  director: string;
  actores: string;
};

export const convertCsvToJson = (file: UploadedFile) => {
  const fileReplace = file.name.replace(/\s/g, '-').toLowerCase();

  const uploadPath = path.join(__dirname, '../../uploads/', fileReplace);

  file.mv(uploadPath, (err) => {
    if (err) {
      return response.status(500).json({ message: err.message });
    }
  });

  const json = csvToJson
    .formatValueByType()
    .getJsonFromCsv(`./uploads/${fileReplace}`);

  const jsonEdited = json.map((movie: MovieType) => {
    return {
      title: movie.titulo,
      genders: movie.genero,
      year: movie.año,
      directors: movie.director,
      actors: movie.actores,
    };
  });

  return jsonEdited;
};
