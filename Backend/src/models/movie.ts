import { DataTypes } from 'sequelize';
import db from '../config/db';

const Movie = db.define(
  'Movie',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    genders: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.STRING,
    },
    directors: {
      type: DataTypes.TEXT('long'),
    },
    actors: {
      type: DataTypes.TEXT('long'),
    },
  },
  {
    paranoid: true,
  }
);

export default Movie;
