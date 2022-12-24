"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorHandler(error, _, res, next) {
    const errorMessage = error.message || "Error! Something went wrong on the server.";
    res.status(501).send(errorMessage);
}
exports.default = errorHandler;
