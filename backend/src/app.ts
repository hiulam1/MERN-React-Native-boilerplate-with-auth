import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import { auth } from "express-openid-connect"
import config from './config/auth.js';


const app = express();
const PORT = 3000;



app.get('/', (req, res) => {
  const message = req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out';
  res.send(`Hello, TypeScript with Express! ${message}`);
});


app.use(cors({origin:'http://localhost:3000'})); // to change before deployment
app.use(morgan('dev'));
app.use(auth(config));

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const connectToMongoDB = async () => {
  try {
    const mongodbURL = process.env.MONGODB_URL!;
    await mongoose.connect(mongodbURL);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};
connectToMongoDB();
