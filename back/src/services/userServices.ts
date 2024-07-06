import moment from "moment";
import IDtoCredential from "../dto/credentialDto";
import IDtoUser from "../dto/userDto";
import IUser from "../interfaces/IUser";
import AuxError from "../utils/AuxiliarError";
import { credentialsValidator, generateCredential } from "./credentialServices";

const UserTable: IUser[] = [
    {
        id: 0,
        name: "Mariano",
        email: "mariano@example.com",
        birthdate: "02/18/1982",
        nDni: 29393370,
        credentialsId: 0,
    },
];

let id = 1;

export const getAllUsers = async (): Promise<IUser[]> => {
    const allUsers = await UserTable.map((user) => {
        return {
            ...user,
            birthdate: moment(user.birthdate).format("DD/MM/YYYY").toString(),
        };
    });
    return allUsers;
};

export const getUserById = async (id: number): Promise<IUser> => {
    const searchedUser = UserTable.find((user) => user.id === id);
    if (!searchedUser) throw new AuxError("User id does not exist.", 404);
    return searchedUser;
};

export const createNewUser = async (userData: IDtoUser): Promise<IUser> => {
    const { name, email, nDni, birthdate, username, password } = userData;
    const userCredentialsId = await generateCredential({ username, password });
    const [day, month, year] = birthdate.split("/").map(Number);
    const newUser: IUser = {
        id,
        name,
        email,
        nDni,
        birthdate,
        credentialsId: userCredentialsId,
    };
    await UserTable.push(newUser);
    id++;
    return newUser;
};

export const logUser = async (credentials: IDtoCredential) => {
    const matchCredentials = await credentialsValidator(credentials);
    const userLoged = await UserTable.find(
        (user) => user.credentialsId === matchCredentials
    );
    return userLoged;
};
