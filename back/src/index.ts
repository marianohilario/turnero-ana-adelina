import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata";
import { AppDataSource } from "./config/data-source";

AppDataSource.initialize().then(() => {
    console.log("Database connection successful");
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});
