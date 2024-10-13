import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/data-source";
import indexRouter from "./routes/indexRouter";
import AuxError from "./utils/AuxiliarError";
import path from "path";

const server = express();

server.use(morgan("dev"));
server.use(cors());
server.use(express.static(path.join(__dirname, "public")));
server.use("/uploads", express.static(path.join(__dirname, "uploads")));
server.use(express.json());
server.use(indexRouter);

server.use((err: AuxError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "An unexpected error occurred";
    res.status(err.statusCode).json({ message: err.message });
});

console.log("Antes de inicializar el servidor...");
AppDataSource.initialize()
    .then(() => {
        console.log("Database connection successful");
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("Database connection failed:", error);
        process.exit(1);
    });
export default server;
