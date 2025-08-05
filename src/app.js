import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import indexRouter from "./routes/index.routes.js";
const app = express();
const allowedOrigins = [
  'http://localhost:5173',
"https://288fe661ae62.ngrok-free.app",
"http://192.168.1.5:4000"
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





app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use("/api/v1",indexRouter)

export default app;
