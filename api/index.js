import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  AuthRoutes, StoreRoutes, CategoryRoutes, ProductRoutes, AdvertisementRoutes
} from './server/routes';
import { TokenMiddleware } from './server/middlewares';

config.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api', AuthRoutes);

app.use('/api/*', TokenMiddleware);

app.use('/api/store', StoreRoutes);

app.use('/api/category', CategoryRoutes);

app.use('/api/product', ProductRoutes);

app.use('/api/advertisement', AdvertisementRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this API.',
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
