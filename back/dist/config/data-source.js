"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const Appointment_1 = require("../entities/Appointment");
const Credential_1 = require("../entities/Credential");
const Services_1 = require("../entities/Services");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: ".env" });
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: (process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Appointment_1.Appointment, Credential_1.UserCredential, Services_1.Services],
    subscribers: [],
    migrations: [],
});
