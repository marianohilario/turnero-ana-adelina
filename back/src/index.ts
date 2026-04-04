import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "./config/envs";
import { AppDataSource } from "./config/data-source";
import indexRouter from "./routes/indexRouter";
import { seedServices } from "./seed";
import AuxError from "./utils/AuxiliarError";
import path from "path";

const server = express();

server.use(morgan("dev"));
server.use(cors());
server.use(express.static(path.join(__dirname, "public")));
server.use("/uploads", express.static(path.join(__dirname, "uploads")));
server.use(express.json());
server.get("/health", (_req, res) => res.status(200).json({ status: "ok" }));
server.use(indexRouter);

server.use((err: AuxError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "An unexpected error occurred";
    res.status(err.statusCode).json({ message: err.message });
});

AppDataSource.initialize()
    .then(async () => {
        console.log("Database connection successful");
        await seedServices();
        server.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Database connection failed:", error);
        process.exit(1);
    });
export default server;
