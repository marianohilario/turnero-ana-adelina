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
exports.credentialsValidator = exports.generateCredential = void 0;
const CredentialRepository_1 = require("../repositories/CredentialRepository");
const UserRepository_1 = require("../repositories/UserRepository");
const AuxiliarError_1 = __importDefault(require("../utils/AuxiliarError"));
const generateCredential = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, username, password } = credentials;
    const newCredential = yield CredentialRepository_1.CredentialRepository.create({
        username,
        password,
    });
    yield CredentialRepository_1.CredentialRepository.save(newCredential);
    const user = yield UserRepository_1.UserRepository.findById(id);
    user.credential = newCredential;
    yield UserRepository_1.UserRepository.save(user);
    return newCredential.id;
});
exports.generateCredential = generateCredential;
const credentialsValidator = (credentials) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = credentials;
    const usernameExist = yield CredentialRepository_1.CredentialRepository.findOneBy({ username });
    if (!usernameExist)
        throw new AuxiliarError_1.default("Username does not exist.", 400);
    if (usernameExist && usernameExist.password !== password)
        throw new AuxiliarError_1.default("Password does not match.", 400);
    return usernameExist;
});
exports.credentialsValidator = credentialsValidator;
