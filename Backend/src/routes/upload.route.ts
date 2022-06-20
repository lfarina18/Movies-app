import { Router } from 'express';
import { uploadMovies } from '../controllers/upload.controller';

const router = Router();

router.post('/', uploadMovies);

export default router;
