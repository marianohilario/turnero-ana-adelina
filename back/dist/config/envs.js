"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_MAIL_PASSWORD = exports.USER_MAIL = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT || 3000;
exports.USER_MAIL = process.env.USER_MAIL;
exports.USER_MAIL_PASSWORD = process.env.USER_MAIL_PASSWORD;
