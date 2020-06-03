import express, { Request, Response, Router } from 'express';
import postsRoute from './posts';
import authRoute from './auth';

const api: Router = express.Router();

api.use('/posts', postsRoute);
api.use('/auth', authRoute);

export default api;
