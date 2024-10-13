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
exports.ServicesRepository = void 0;
const data_source_1 = require("../config/data-source");
const Services_1 = require("../entities/Services");
const AuxiliarError_1 = __importDefault(require("../utils/AuxiliarError"));
exports.ServicesRepository = data_source_1.AppDataSource.getRepository(Services_1.Services).extend({
    findById: function (id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield this.findOneBy({ id });
            if (service)
                return service;
            throw new AuxiliarError_1.default("Invalid serviceId", 400);
        });
    },
});
