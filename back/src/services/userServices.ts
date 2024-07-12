import { IDtoCredential } from "../dto/credentialDto";
import IDtoUser from "../dto/userDto";
import AuxError from "../utils/AuxiliarError";
import { credentialsValidator, generateCredential } from "./credentialServices";
import { UserRepository } from "../repositories/UserRepository";
import { User } from "../entities/User";

export const getAllUsers = async (): Promise<User[]> => {
    const users = await UserRepository.find({
        relations: {
            appointments: true,
        },
        order: { id: "ASC" },
    });
    if (users.length !== 0) return users;
    throw new AuxError("No users to show", 404);
};

export const getUserById = async (id: number): Promise<User> => {
    const searchedUser = await UserRepository.findOne({
        where: { id },
        relations: {
            appointments: true,
        },
    });
    if (!searchedUser) throw new AuxError("User id does not exist.", 404);
    return searchedUser;
};

export const createNewUser = async (userData: IDtoUser): Promise<User> => {
    const { username, password } = userData;
    const newUser = await UserRepository.create({
        ...userData,
    });
    const result = await UserRepository.save(newUser);
    await generateCredential({ username, password, id: newUser.id });
    return result;
};

export const logUser = async (credentials: IDtoCredential) => {
    const matchCredentials = await credentialsValidator(credentials);
    const user = await UserRepository.findOneBy({
        credential: matchCredentials,
    });
    if (user) return { login: true, user };
    throw new AuxError("Credentials does not match any user", 400);
};
