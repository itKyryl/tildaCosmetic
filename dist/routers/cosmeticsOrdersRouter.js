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
ordersRouter.post("/acceptPaymentStripe", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield CosmeticsOrdersController_1.default.processPayment(req, res);
    }
    catch (e) {
        next(e);
    }
}));
exports.default = ordersRouter;
