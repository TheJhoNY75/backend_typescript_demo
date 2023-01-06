import express, { Application } from 'express';
import morgan from 'morgan';
import { jsonErrorHandler } from './validate';
import indexRoutes from './routes/index.routes';
import postRoutes from './routes/post.routes';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import userRoutes from './routes/user.routes';


//primer clase importada


export class App{
  
  private app: Application;

  constructor(private port?: number | string){
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
  }

  settings(){
    this.app.set('port', this.port || process.env.SERVER_PORT || 3333);
  }

  middlewares(){
    this.app.use(morgan(`dev`));
    this.app.use(express.json());
    this.app.use(jsonErrorHandler);
  }

  routes(){
    this.app.use(indexRoutes);
    this.app.use('/api/post', postRoutes);
    this.app.use('/api/singup', authRoutes);
    this.app.use('/api/product', productRoutes);
    this.app.use('/api/user', userRoutes);
  }

  async listen() {
    await this.app.listen(this.app.get('port'));
    console.log('Server started on port ', this.app.get('port'));
  }
}
