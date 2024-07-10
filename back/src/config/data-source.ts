import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Appointment } from "../entities/Appointment";
import { UserCredential } from "../entities/Credential";

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
    entities: [User, Appointment, UserCredential],
    subscribers: [],
    migrations: [],
});

export const UserModel = AppDataSource.getRepository(User);
export const AppointmentModel = AppDataSource.getRepository(Appointment);
export const CredentialModel = AppDataSource.getRepository(UserCredential);
