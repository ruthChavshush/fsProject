import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { authanticate } from './middlewares/auth.middleware';
import routes from './routes';
import postRoutes from './routes/postRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import swaggerOptions from './swagger/swaggerOptions';
import path from "path";

import logger from './utils/logger.util';
dotenv.config();

const app = express();

// Configure CORS to allow requests from http://localhost:5173 with credentials
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use('/uploads', express.static('uploads'));

// Connect to MongoDB
logger.info(process.env.DB_URL);
mongoose.connect(process.env.DB_URL as string);
const db = mongoose.connection;
db.on('error', error => {
  console.error(error);
});
db.once('open', () => logger.info('connected to mongodb!!'));

// Middleware
app.use(express.json());

// Routes
app.use('/api/posts', authanticate, postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Swagger Config
const specs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Router Config
app.use('/api/v1', routes);

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    if (!req.path.startsWith("/api")) {
      const filePath = `../client/dist${
        req.path === "/" ? "/index.html" : req.path
      }`;
      res.sendFile(path.resolve(filePath));
    }
  });
}

export default app;
