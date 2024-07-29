import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import { UserCredential } from "../entities/Credential";
import { Services } from "../entities/Services";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "appointments",
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Appointment, UserCredential, Services],
    subscribers: [],
    migrations: [],
});
