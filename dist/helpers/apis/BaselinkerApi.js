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
dotenv_1.default.config();
class BaselinkerApiController {
    constructor() {
        this.token = process.env.BASELINKERTOKEN ? process.env.BASELINKERTOKEN : "2719-19147-C8934UFTA61DAUBMXNWZFJJPWUUGWFLECW5UGCJ9WIRROLHZPIS9Q6Y5X07FDUS5";
    }
    addNewOrder(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this.generateBaselinkerRequestConfig("addOrder", (0, baselinkerHelper_1.convertOrderParams)(body));
            const headers = {
                'X-BLToken': this.token,
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            };
            const response = yield (0, node_fetch_1.default)("https://api.baselinker.com/connector.php", { method: "POST", body: params, headers }); //await axios.post("https://api.baselinker.com/connector.php", params, options);
            const data = yield response.json();
            console.log(data);
            if (data.status === "SUCCESS") {
                return true;
            }
            else {
                console.log(data);
                return false;
            }
        });
    }
    generateBaselinkerRequestConfig(method, params) {
        return new url_1.default.URLSearchParams({
            "method": method,
            "parameters": params ? JSON.stringify(params) : ""
        }).toString();
    }
}
exports.default = new BaselinkerApiController();
