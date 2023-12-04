import express from 'express';
import dotenv from 'dotenv';
import drawRoutes from './routes/drawroutes';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use('/public', express.static('public'));
  }

  routes() {
    this.app.use('/', drawRoutes);
  }
}

export default new App().app;
