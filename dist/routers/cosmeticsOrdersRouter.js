"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CosmeticsOrdersController_1 = __importDefault(require("../controllers/CosmeticsOrdersController"));
const ordersRouter = express_1.default.Router();
ordersRouter.post("/", (req, res, next) => {
    res.status(200).send("Works");
});
ordersRouter.post("/acceptOrder", (req, res, next) => {
    try {
        if (req.body.test) {
            res.status(200).send("ok");
        }
        else {
            CosmeticsOrdersController_1.default.processOrder(req, res);
        }
    }
    catch (e) {
        next(e);
    }
});
exports.default = ordersRouter;
