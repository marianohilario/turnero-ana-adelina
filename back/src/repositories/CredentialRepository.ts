import { AppDataSource } from "../config/data-source";
import { UserCredential } from "../entities/Credential";

export const CredentialRepository = AppDataSource.getRepository(UserCredential);