import { CredentialRepository } from "../repositories/CredentialRepository";
import { UserRepository } from "../repositories/UserRepository";
import { IDtoCredential, IDtoLogin } from "../dto/credentialDto";
import { UserCredential } from "../entities/Credential";
import ICredential from "../interfaces/ICredentials";
import AuxError from "../utils/AuxiliarError";

export const generateCredential = async (
    credentials: IDtoCredential
): Promise<number> => {
    const { id, username, password } = credentials;
    const newCredential: ICredential = await CredentialRepository.create({
        username,
        password,
    });
    await CredentialRepository.save(newCredential);
    const user = await UserRepository.findById(id);
    user.credential = newCredential;
    await UserRepository.save(user);
    return newCredential.id;
};

export const credentialsValidator = async (
    credentials: IDtoLogin
): Promise<UserCredential> => {
    const { username, password } = credentials;
    const usernameExist = await CredentialRepository.findOneBy({ username });
    if (!usernameExist) throw new AuxError("Username does not exist.", 400);
    if (usernameExist && usernameExist.password !== password)
        throw new AuxError("Password does not match.", 400);
    return usernameExist;
};
