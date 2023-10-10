import express from 'express';
import http from 'http';
import usersRouter from './routes/users';
import appConfig from './config';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const CORS_ORIGINS = ['http://localhost:3000'];

// MIDDLEWARE
app.use(express.json({ limit: '10MB' }));
app.use(
  cors({
    origin: CORS_ORIGINS,
    methods: '*',
  }),
);

// ROUTES
app.use('/users', usersRouter);

export const startApp = () => {
  server.listen(appConfig.PORT, () =>
    console.log(`Server listening on *:${appConfig.PORT}`),
  );
};
