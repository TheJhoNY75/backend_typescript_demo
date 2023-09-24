import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { jsonErrorHandler } from '../middlewares';
import indexRoutes from '../routes/index.routes';
import postRoutes from '../routes/post.routes';
import authRoutes from '../routes/auth.routes';
import userRoutes from '../routes/user.routes';
import whoamiRouets from '../routes/whoami.routes';

dotenv.config();

export function createApp(port?: number | string, host?: string): Application {
  const app = express();
  app.set('host', host || process.env.SERVER_HOST || 'http://localhost');
  app.set('port', port || process.env.SERVER_PORT || 3333);

  app.use(morgan(`dev`));
  app.use(cors({
    origin: [`${app.get('host')}:${app.get('port')}`, 'https://thejhony.com'],
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(jsonErrorHandler);

  app.use(indexRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/post', postRoutes);
  app.use('/api/whoami', whoamiRouets)

  return app;
}