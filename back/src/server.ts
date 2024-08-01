import express, { NextFunction, Request, Response } from "express";
import indexRouter from "./routes/indexRouter";
import morgan from "morgan";
import cors from "cors";
import AuxError from "./utils/AuxiliarError";
import path from 'path';

const server = express();
server.use(morgan("dev"));
server.use(cors());

  server.use(express.static(path.join(__dirname, 'public')));
  server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  server.use(express.json());
  server.use(indexRouter);
  server.use((err: AuxError, req: Request, res: Response, next: NextFunction) => {
      err.statusCode = err.statusCode || 500;
      err.message = err.message || "An unexpected error ocurred";
      res.status(err.statusCode).json({ message: err.message });
    });
    
    
    export default server;
