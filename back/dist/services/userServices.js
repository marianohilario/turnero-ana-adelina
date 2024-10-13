"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersWithUsername = exports.logUser = exports.createNewUser = exports.getUserById = exports.getAllUsers = void 0;
const AuxiliarError_1 = __importDefault(require("../utils/AuxiliarError"));
const credentialServices_1 = require("./credentialServices");
const UserRepository_1 = require("../repositories/UserRepository");
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserRepository_1.UserRepository.find({
        relations: {
            appointments: true,
        },
        order: { id: "ASC" },
    });
    if (users.length !== 0)
        return users;
    throw new AuxiliarError_1.default("No users to show", 404);
});
exports.getAllUsers = getAllUsers;
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const searchedUser = yield UserRepository_1.UserRepository.findOne({
        where: { id },
        relations: {
            appointments: true,
        },
    });
    if (!searchedUser)
        throw new AuxiliarError_1.default("User id does not exist.", 404);
    return searchedUser;
});
exports.getUserById = getUserById;
const createNewUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = userData;
    const newUser = yield UserRepository_1.UserRepository.create(Object.assign({}, userData));
    const result = yield UserRepository_1.UserRepository.save(newUser);
    yield (0, credentialServices_1.generateCredential)({ username, password, id: newUser.id });
    return result;
});
exports.createNewUser = createNewUser;
const logUser = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const matchCredentials = yield (0, credentialServices_1.credentialsValidator)(credentials);
    const user = yield UserRepository_1.UserRepository.findOneBy({
        credential: matchCredentials,
    });
    if (user)
        return { login: true, user };
    throw new AuxiliarError_1.default("Credentials does not match any user", 400);
});
exports.logUser = logUser;
const usersWithUsername = () => __awaiter(void 0, void 0, void 0, function* () {
    const profiles = yield UserRepository_1.UserRepository.createQueryBuilder("user")
        .leftJoinAndSelect("user.credential", "credential")
        .select(["user.nDni", "user.email", "credential.username"])
        .getMany();
    return profiles;
});
exports.usersWithUsername = usersWithUsername;
