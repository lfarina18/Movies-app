import {Router} from 'express';
import { getMovies, uploadMovies } from '../controllers/movies.controller';

const router = Router();

router.get('/', getMovies);

router.post('/', uploadMovies);



export default router;