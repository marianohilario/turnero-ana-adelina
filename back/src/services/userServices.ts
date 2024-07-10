import { IDtoCredential } from "../dto/credentialDto";
import IDtoUser from "../dto/userDto";
import AuxError from "../utils/AuxiliarError";
import { credentialsValidator, generateCredential } from "./credentialServices";
import { UserModel } from "../config/data-source";
import { User } from "../entities/User";

export const getAllUsers = async (): Promise<User[]> => {
    const users = await UserModel.find({
        relations: {
            credential: true,
            appointments: true,
        },
    });
    return users;
};

export const getUserById = async (id: number): Promise<User> => {
    const searchedUser = await UserModel.findOne({
        where: { id },
        relations: {
            credential: true,
            appointments: true,
        },
    });
    if (!searchedUser) throw new AuxError("User id does not exist.", 404);
    return searchedUser;
};

export const createNewUser = async (userData: IDtoUser): Promise<User> => {
    const { username, password } = userData;
    const newUser = await UserModel.create({
        ...userData,
    });
    const result = await UserModel.save(newUser);
    await generateCredential({ username, password, id: newUser.id });
    return result;
};

export const logUser = async (credentials: IDtoCredential) => {
    const matchCredentials = await credentialsValidator(credentials);
    const userLoged = await UserModel.findOneBy({
        credential: matchCredentials,
    });
    return userLoged;
};
