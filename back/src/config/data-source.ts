import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import { UserCredential } from "../entities/Credential";
import { Services } from "../entities/Services";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env" });

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Appointment, UserCredential, Services],
    subscribers: [],
    migrations: [],
});
