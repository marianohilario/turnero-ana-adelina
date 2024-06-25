import express from "express";
import indexRouter from "./routes/indexRouter";
import morgan from 'morgan'

const server = express();
server.use(morgan('dev'))
server.use(express.json());
server.use(indexRouter)

export default server;
