import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import moviesRoutes from '../routes/movies.route';
import uploadRoutes from '../routes/upload.route';
import db from '../config/db';
class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    movies: '/api/movies',
    upload: '/api/upload',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '8080';

    this.dbConnection();
    this.middlewares();
    this.routes();
  }

  async dbConnection() {
    try {
      await db.authenticate();
      console.log('DB Connection has been established successfully.');
      await db.sync();
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static('public'));

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
      })
    );
  }

  routes() {
    this.app.use(this.apiPaths.movies, moviesRoutes);
    this.app.use(this.apiPaths.upload, uploadRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

export default Server;
