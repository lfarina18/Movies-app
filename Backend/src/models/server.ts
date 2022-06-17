import express, { Application } from 'express';
import cors from 'cors';
import moviesRoutes from '../routes/movies.route';
import db from '../config/db';
class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        movies: '/api/movies',
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
        } catch (error: any) {
            throw new Error(error);
        }
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.movies, moviesRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}

export default Server;
