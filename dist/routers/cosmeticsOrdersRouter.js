"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ordersRouter = express_1.default.Router();
ordersRouter.post("/", (req, res, next) => {
    res.status(200).send("Works");
});
ordersRouter.get("/", (req, res, next) => {
    res.status(200).send("Test");
});
exports.default = ordersRouter;
