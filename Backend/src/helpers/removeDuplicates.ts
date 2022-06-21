import { MovieType } from './convertCsvToJson';

export const removeDuplicates = (array: MovieType[]) => {
  const unique = [];

  const arrayNonUndefined = array.filter((movie: MovieType) => movie.titulo !== 'undefined');

  for (let index = 0; index < arrayNonUndefined.length; index++) {
    const movie = arrayNonUndefined[index];
    let isDuplicate = false;
    for (let i = 0; i < unique.length; i++) {
      if (unique[i].titulo === movie.titulo) {
        isDuplicate = true;
        break;
      }
    }

    if (!isDuplicate) {
      unique.push(movie);
    }
  }

  return unique;
};
