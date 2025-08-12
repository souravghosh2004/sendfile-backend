import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import indexRouter from "./routes/index.routes.js";
import { NODE_ENV } from './config/env.confing.js';
import cookieParser from 'cookie-parser';

const app = express();
const allowedOrigins = [
  'http://localhost:5173',
  "https://sendfile-tau.vercel.app"
];

app.use(cors({
  origin: function(origin, callback){
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use(cookieParser());


app.use(express.json());
app.use(express.urlencoded({extended:true}));
if(NODE_ENV != "production"){
  app.use(morgan('dev'));
}

import rateLimit from "express-rate-limit";
app.set("trust proxy", 1);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limit each IP to 100 requests
  message: { 
    success: false, 
    message: "Too many requests from this IP, please try again later." 
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/v1",apiLimiter,indexRouter)

export default app;
