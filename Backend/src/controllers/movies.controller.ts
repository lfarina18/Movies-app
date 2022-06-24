import { Request, Response, RequestHandler } from 'express';
const { Op } = require("sequelize");
import { CapitalizeString } from '../helpers/CapitalizeFunction';
import Movie from '../models/movie';

type Params = {};
type ResBody = {};
type ReqBody = {};
type ReqQuery = {
    query: string;
}

export const getMovies:RequestHandler<Params, ResBody, ReqBody, ReqQuery> = async (req: Request, res: Response) => {

  const pageAsNumber = Number(req.query.page);
  const sizeAsNumber = Number(req.query.size);
  
  let page = 0;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
    page = pageAsNumber;
  }

  let size = 5000;
  if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
    size = sizeAsNumber;
  }

  try {
    const movies = await Movie.findAndCountAll({
      limit: size,
      offset: page * size
    });

    res.json({
      count: movies.count,
      content: movies.rows,
      totalPages: Math.ceil(movies.count / Number(size))
    });

  } catch (error) {
    res.status(500).json({
      message: 'Ha habido un error. Habla con el administrador'
    });
  }

};

export const getMovie:RequestHandler<Params, ResBody, ReqBody, ReqQuery> = async (req: Request, res: Response) => {
  const { title } = req.params;
  const pageAsNumber = Number(req.query.page);
  const sizeAsNumber = Number(req.query.size);
  
  let page = 0;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0){
    page = pageAsNumber;
  }

  let size = 10;
  if(!Number.isNaN(sizeAsNumber) && !(sizeAsNumber > 10) && !(sizeAsNumber < 1)){
    size = sizeAsNumber;
  }

  try {
    const movie = await Movie.findAndCountAll({
      where: {
        title: {
          [Op.like]: `%${title}%`
        },
      },
      limit: Number(size),
      offset: Number(page) * Number(size)
    });

    res.json({
      count: movie.count,
      content: movie.rows,
      totalPages: Math.ceil(movie.count / Number(size))
    });
  } catch (error) {
    res.status(500).json({
      message: 'Ha habido un error. Habla con el administrador'
    });
  }
};

export const putMovie = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, genders, year, directors, actors } = req.body;

  const titleEdit: string = CapitalizeString(title)
  const gendersEdit: string = CapitalizeString(genders)
  const yearEdit: string = CapitalizeString(year)
  const directorsEdit: string = CapitalizeString(directors)
  const actorsEdit: string = CapitalizeString(actors)

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
      message: 'Ha habido un error. Habla con el administrador'
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
      message: 'Ha habido un error. Habla con el administrador'
    });
  }
};