import IDtoCredential from "../dto/credentialDto";
import ICredential from "../interfaces/ICredentials";
import AuxError from "../utils/AuxiliarError";

const credentialsTable: ICredential[] = [
    {
        id: 0,
        username: 'mhilario',
        password: 'password'
    }
];

export const generateCredential = async (
    credentials: IDtoCredential
): Promise<number> => {
    const { username, password } = credentials;
    const newCredential: ICredential = {
        id: Date.now(),
        username,
        password,
    };
    await credentialsTable.push(newCredential);
    return newCredential.id;
};

export const credentialsValidator = async (
    credentials: IDtoCredential
): Promise<number> => {
    const { username, password } = credentials;
    const usernameExist = await credentialsTable.find(
        (credential) => credential.username === username
    );
    if (!usernameExist) throw new AuxError("Username does not exist.", 404);
    if (usernameExist && usernameExist.password !== password)
        throw new AuxError("Password does not match.", 404);
    return usernameExist.id;
};
