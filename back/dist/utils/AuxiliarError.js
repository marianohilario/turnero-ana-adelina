"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuxError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.default = AuxError;
