import { CredentialModel, UserModel } from "../config/data-source";
import { IDtoCredential, IDtoLogin } from "../dto/credentialDto";
import { UserCredential } from "../entities/Credential";
import ICredential from "../interfaces/ICredentials";
import AuxError from "../utils/AuxiliarError";

export const generateCredential = async (
    credentials: IDtoCredential
): Promise<number> => {
    const { id, username, password } = credentials;
    const newCredential: ICredential = await CredentialModel.create({
        username,
        password,
    });
    await CredentialModel.save(newCredential);
    const user = await UserModel.findOneBy({ id });
    if (!user) throw new AuxError("Inexistent user", 404);
    user.credential = newCredential;
    await UserModel.save(user);
    return newCredential.id;
};

export const credentialsValidator = async (
    credentials: IDtoLogin
): Promise<UserCredential> => {
    const { username, password } = credentials;
    const usernameExist = await CredentialModel.findOneBy({ username });    
    if (!usernameExist) throw new AuxError("Username does not exist.", 404);
    if (usernameExist && usernameExist.password !== password)
        throw new AuxError("Password does not match.", 404);
    return usernameExist;
};
