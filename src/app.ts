import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { jsonErrorHandler } from './middlewares';
import indexRoutes from './routes/index.routes';
import postRoutes from './routes/post.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import whoamiRouets from './routes/whoami.routes';

//swagger
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { swaggerSpecs } from './utils';

const swaggerUiOptions = {
  explorer: true
};

const swaggerOptions = swaggerJsDoc(swaggerSpecs);

export class App{
  
  private app: Application;

  constructor(private port?: number | string, private host?: string){
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings(){
    this.app.set('host', this.host || process.env.SERVER_HOST || 'http://localhost');
    this.app.set('port', this.port || process.env.SERVER_PORT || 3333);
  }

  middlewares(){
    this.app.use(morgan(`dev`));
    this.app.use(cors({
      origin: [`${this.app.get('host')}:${this.app.get('port')}`, 'https://thejhony.com'],
    }));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(jsonErrorHandler);
  }

  routes(){
    this.app.use(indexRoutes);
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/user', userRoutes);
    this.app.use('/api/post', postRoutes);
    this.app.use('/api/whoami', whoamiRouets)
    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions, swaggerUiOptions));
  }

  address(){
    return `${this.app.get('host')}:${this.app.get('port')}`;
  }

  async start() {
    await this.app.listen(this.app.get('port'));
    console.log('Server started on port ', this.app.get('port'));
  }
}
