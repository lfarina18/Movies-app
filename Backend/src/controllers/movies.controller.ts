import { Request, Response } from 'express';
const { Op } = require("sequelize");
import { CapitalizeString } from '../helpers/CapitalizeFunction';
import Movie from '../models/movie';

export const getMovies = async (req: Request, res: Response) => {
  const movies = await Movie.findAndCountAll();

  res.json(movies);
};

export const getMovie = async (req: Request, res: Response) => {
  const { title } = req.params;

  try {
    const movie = await Movie.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${title}%`
        },
      }
    });

    res.json(movie);
  } catch (error) {
    res.status(404).json({
      msg: `There is no movie with the title: ${title}`,
    });
  }
};

export const putMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, genders, year, directors, actors } = req.body;

  const titleEdit:string = CapitalizeString(title)
  const gendersEdit:string = CapitalizeString(genders)
  const yearEdit:string = CapitalizeString(year)
  const directorsEdit:string = CapitalizeString(directors)
  const actorsEdit:string = CapitalizeString(actors)
  
  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(400).json({
        msg: `You cannot update the user with the id: ${id}. It does not exist`,
      });
    }
    await movie.update({
      title: titleEdit,
      genders: gendersEdit,
      year: yearEdit,
      directors: directorsEdit,
      actors: actorsEdit
    });
    res.json({
        msg: `The id: ${id}, has been update in the database.`,
        movie
      })

  } catch (error) {
    res.status(500).json('There was an error. talk to the Administrator');
  }
};

export const DeleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(400).json({
        msg: `You cannot delete the user with the id: ${id}. It does not exist`,
      });
    }
    await movie.destroy();
    res.json({
      msg: `The id: ${id}, has been deleted from the database.`,
      movie
    });
  } catch (error) {
    res.status(500).json('There was an error. talk to the Administrator');
  }
};