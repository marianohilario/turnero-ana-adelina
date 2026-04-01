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
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const envs_1 = require("./config/envs");
const data_source_1 = require("./config/data-source");
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const seed_1 = require("./seed");
const path_1 = __importDefault(require("path"));
const server = (0, express_1.default)();
server.use((0, morgan_1.default)("dev"));
server.use((0, cors_1.default)());
server.use(express_1.default.static(path_1.default.join(__dirname, "public")));
server.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "uploads")));
server.use(express_1.default.json());
server.use(indexRouter_1.default);
server.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "An unexpected error occurred";
    res.status(err.statusCode).json({ message: err.message });
});
data_source_1.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Database connection successful");
    yield (0, seed_1.seedServices)();
    server.listen(envs_1.PORT, () => {
        console.log(`Server listening on port ${envs_1.PORT}`);
    });
}))
    .catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
});
exports.default = server;
