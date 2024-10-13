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
exports.loginUser = exports.createUser = exports.getUser = exports.getUsers = exports.getUsersWithUsername = void 0;
const userServices_1 = require("../services/userServices");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
exports.getUsersWithUsername = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AllUsers = yield (0, userServices_1.usersWithUsername)();
    res.status(200).json(AllUsers);
}));
exports.getUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const AllUsers = yield (0, userServices_1.getAllUsers)();
    res.status(200).json(AllUsers);
}));
exports.getUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.id);
    const searchedUser = yield (0, userServices_1.getUserById)(userId);
    res.status(200).json(searchedUser);
}));
exports.createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield (0, userServices_1.createNewUser)(req.body);
    res.status(201).json(newUser);
}));
exports.loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const successLog = yield (0, userServices_1.logUser)(req.body);
    res.status(200).json(successLog);
}));
