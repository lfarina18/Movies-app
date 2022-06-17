import {Router} from 'express';
import { getMovies, postMovies } from '../controllers/movies.controller';

const router = Router();

router.get('/', getMovies);
router.post('/', postMovies);



export default router;