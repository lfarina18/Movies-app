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
    res.status(500).json({
      message:'Ha habido un error. Habla con el administrador'
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
        message: `No se puede actualizar el usuario con el id: ${id}. No existe.`,
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
        msg: `El id: ${id},se ha actualizado en la base de datos.`,
        movie
      })

  } catch (error) {
    res.status(500).json({
      message:'Ha habido un error. Habla con el administrador'
    });
  }
};

export const DeleteMovie = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      return res.status(400).json({
        message: `No se puede eliminar el usuario con el id: ${id}. No existe.`,
      });
    }
    await movie.destroy();
    res.json({
      message: `El id: ${id}, ha sido eliminado de la base de datos.`,
      movie
    });
  } catch (error) {
    res.status(500).json({
      message:'Ha habido un error. Habla con el administrador'
    });
  }
};