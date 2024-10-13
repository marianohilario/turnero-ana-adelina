"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const server = (0, express_1.default)();
server.use((0, morgan_1.default)("dev"));
server.use((0, cors_1.default)());
server.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
server.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
server.use(express_1.default.json());
server.use(indexRouter_1.default);
server.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "An unexpected error ocurred";
    res.status(err.statusCode).json({ message: err.message });
});
exports.default = server;
