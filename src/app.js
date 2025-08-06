import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import indexRouter from "./routes/index.routes.js";
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





app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use("/api/v1",indexRouter)

export default app;
