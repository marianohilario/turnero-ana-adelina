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
exports.getServices = void 0;
const ServicesRepository_1 = require("../repositories/ServicesRepository");
const AuxiliarError_1 = __importDefault(require("../utils/AuxiliarError"));
const getServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const allServices = yield ServicesRepository_1.ServicesRepository.find({
        order: {
            id: "ASC",
        },
    });
    if (allServices.length !== 0)
        return allServices;
    throw new AuxiliarError_1.default("No services to show", 404);
});
exports.getServices = getServices;
