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
const BaselinkerApi_1 = __importDefault(require("../helpers/apis/BaselinkerApi"));
class CosmeticsOrdersController {
    processOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderWasAdded = yield BaselinkerApi_1.default.addNewOrder(req.body);
            if (orderWasAdded) {
                res.status(200).send("Order was added");
            }
            else {
                res.status(501).send("Order was not added");
            }
        });
    }
    processPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            if (body.data.object.captured) {
                const capturedAmount = Number.parseFloat(body.data.object.amount_captured) / 100;
                const date = new Date();
                date.setDate(date.getDate() - 1);
                const utcTime = Math.trunc(date.getTime() / 1000);
                const lookingOrder = yield BaselinkerApi_1.default.getOrderByOrderIdExtraField(utcTime, body.data.object.metadata.invoiceid);
                const success = yield BaselinkerApi_1.default.updateOrderPayment(lookingOrder.order_id, capturedAmount);
                if (success) {
                    res.status(200).send("Payment was uppdated");
                }
            }
        });
    }
}
exports.default = new CosmeticsOrdersController();
