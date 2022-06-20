import { MovieType } from './convertCsvToJson';

export const removeDuplicates = (array: MovieType[]) => {
  const unique = [];
  for (let indice = 0; indice < array.length; indice++) {
    const movie = array[indice];
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
