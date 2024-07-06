import express, { NextFunction, Request, Response } from "express";
import indexRouter from "./routes/indexRouter";
import morgan from "morgan";
import AuxError from "./utils/AuxiliarError";

const server = express();
server.use(morgan("dev"));
server.use(express.json());
server.use(indexRouter);
server.use((err: AuxError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'An unexpected error ocurred'
    res.status(err.statusCode).json({ message: err.message });
});

export default server;
