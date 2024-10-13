"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const servicesControllers_1 = require("../controllers/servicesControllers");
const servicesRouter = (0, express_1.Router)();
servicesRouter.get("/", servicesControllers_1.getAllServices);
exports.default = servicesRouter;
