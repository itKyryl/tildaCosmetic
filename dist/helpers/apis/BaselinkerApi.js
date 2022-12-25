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
const url_1 = __importDefault(require("url"));
const dotenv_1 = __importDefault(require("dotenv"));
const baselinkerHelper_1 = require("../baselinkerHelper");
const node_fetch_1 = __importDefault(require("node-fetch"));
const pause_1 = require("../pause");
dotenv_1.default.config();
class BaselinkerApiController {
    constructor() {
        this.token = process.env.BASELINKERTOKEN ? process.env.BASELINKERTOKEN : "2719-19147-C8934UFTA61DAUBMXNWZFJJPWUUGWFLECW5UGCJ9WIRROLHZPIS9Q6Y5X07FDUS5";
    }
    createHeader() {
        return {
            'X-BLToken': this.token,
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };
    }
    addNewOrder(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = yield this.generateBaselinkerRequestConfig("addOrder", (0, baselinkerHelper_1.convertOrderParams)(body));
            const response = yield (0, node_fetch_1.default)("https://api.baselinker.com/connector.php", { method: "POST", body: params, headers: this.createHeader() });
            const data = yield response.json();
            if (data.status === "SUCCESS") {
                return true;
            }
            else {
                return false;
            }
        });
    }
    updateOrderPayment(orderId, paymentDone) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = yield this.generateBaselinkerRequestConfig("setOrderPayment", {
                "order_id": orderId,
                "payment_done": paymentDone,
                "payment_date": new Date().getTime(),
                "payment_comment": ""
            });
            const response = yield (0, node_fetch_1.default)("https://api.baselinker.com/connector.php", { method: "POST", body: params, headers: this.createHeader() });
            const resData = yield response.json();
            if (resData.status === "SUCCESS") {
                return true;
            }
            throw new Error(`Error! Function ${this.updateOrderPayment.name}. Baselinker error: ${resData.error_message}. Baselinker order id: ${orderId}.`);
        });
    }
    getOrderByOrderIdExtraField(dateFrom, lookingExtraField) {
        return __awaiter(this, void 0, void 0, function* () {
            const ordersList = yield this.getListOfOrders(dateFrom);
            let lookingOrder = undefined;
            for (let order of ordersList) {
                if (order.extra_field_1 === lookingExtraField) {
                    lookingOrder = order;
                }
            }
            if (!lookingOrder) {
                throw new Error("Error! Can not find order in baselinker by tilda order id. It could be a consequence of small order looking time period");
            }
            return lookingOrder;
        });
    }
    getListOfOrders(date) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
                let orders = [];
                let params = yield this.generateBaselinkerRequestConfig("getOrders", {
                    "get_unconfirmed_orders": "true",
                    "date_from": date
                });
                const responce = yield (0, node_fetch_1.default)('https://api.baselinker.com/connector.php', { method: "POST", body: params, headers: this.createHeader() });
                const responceData = yield responce.json();
                orders = orders.concat(responceData.orders);
                if (responceData.orders.length === 100) {
                    date = responceData.orders[responceData.orders.length - 1].date_confirmed + 1;
                    orders = orders.concat(yield this.getListOfOrders(date));
                }
                res(orders);
            }));
        });
    }
    generateBaselinkerRequestConfig(method, params) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, pause_1.pause)(1000);
            return new url_1.default.URLSearchParams({
                "method": method,
                "parameters": params ? JSON.stringify(params) : ""
            }).toString();
        });
    }
}
exports.default = new BaselinkerApiController();
