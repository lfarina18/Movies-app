type ArchiveType = {
  title: string;
  genders: string;
  year: string;
  directors: string;
  actors: string;
};

const CapitalizeString = (string: string) => {
  const words = string.toString().split(' ');

  const stringEdit = words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');

  return stringEdit;
};

export const CapitalizedArray = (array: ArchiveType[]) => {
  const arrayCapitalized = array.map((movie: ArchiveType) => {
    return {
      title: CapitalizeString(movie.title),
      genders: CapitalizeString(movie.genders),
      year: movie.year,
      directors: CapitalizeString(movie.directors),
      actors: CapitalizeString(movie.actors),
    };
  });

  return arrayCapitalized;
};
