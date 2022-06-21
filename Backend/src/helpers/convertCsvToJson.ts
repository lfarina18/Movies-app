import { removeDuplicates } from './removeDuplicates';
const csvToJson = require('convert-csv-to-json');
import * as fs from 'fs';

export type MovieType = {
  titulo: string;
  genero: string;
  año: string;
  director: string;
  actores: string;
};

export const convertCsvToJson = (fileReplace: string) => {
  const json = csvToJson
    .formatValueByType()
    .getJsonFromCsv(`./uploads/${fileReplace}`);

  const jsonWihtoutDuplicate = removeDuplicates(json);

  const jsonEdited = jsonWihtoutDuplicate.map((movie: MovieType) => {
    return {
      title: movie.titulo,
      genders: movie.genero,
      year: movie.año,
      directors: movie.director,
      actors: movie.actores,
    };
  });

  if (fs.existsSync(`./uploads/${fileReplace}`)) {
    fs.unlinkSync(`./uploads/${fileReplace}`);
  }

  return jsonEdited;
};
