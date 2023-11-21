import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import { requestLogger, errorLogger } from './middlewares/logger.js';
import limiter from './middlewares/limiter.js';
import appRoute from './routes/index.js';
import handleError from './middlewares/handleError.js';

config();

const { PORT, DB_URL } = process.env;
const app = express();

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log('then');
  })
  .catch((err) => {
    console.log(err);
  });

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(limiter);

app.use(appRoute);

app.use(errorLogger);
app.use(handleError);

app.listen(PORT);
