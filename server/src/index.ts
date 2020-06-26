import dotenv from 'dotenv';
import express, { Application } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import apiRoute from './api';
import jwtMiddleware from './lib/jwtMiddleware';

const app: Application = express();

// Load config
dotenv.config({ path: './config/config.env' });
const { MONGO_URI, PORT } = process.env;

// DB Setting
mongoose
    .connect(MONGO_URI as string, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(e => console.log('Error : ', e));

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Settings
app.use(cookieParser());
app.use(
    session({
        secret:
            '5b7d1848ef4235c83dc73dd7f4b0ed5c6879ded6955e5b8396aae5ddc80e1caa',
        resave: false,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', express.static(path.join(__dirname, '../../client/build')));
app.use(jwtMiddleware);
// Routing
app.use('/api', apiRoute);

const port = PORT || 4000;
app.listen(port, () => console.log(`server is running at ${port}!`));
