import { Router } from 'express';
import { getMovies, getMovie, putMovie, DeleteMovie } from '../controllers/movies.controller';

const router = Router();

router.get('/', getMovies);
router.get('/:title', getMovie);
router.put('/:id', putMovie);
router.delete('/:id', DeleteMovie);

export default router;
