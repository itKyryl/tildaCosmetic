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
            // console.log(JSON.stringify(req.body))
            if (orderWasAdded) {
                res.status(200).send("Order was added");
            }
            else {
                res.status(501).send("Order was not added");
            }
        });
    }
}
exports.default = new CosmeticsOrdersController();
/*
{
  "name": "Test",
  "surname": "Test",
  "CITY": "Cracow",
  "phone": "+48 (881) 719-668",
  "spices": "Peeling do twarzy 79zl",
  "deliveryOptions": "ubezpieczenie,niespodzianka,gwarancja,express,pobranie=105.3",
  "paymentsystem": "cash",
  "payment": {
    "orderid": "2040504151",
    "products": [
      {
        "name": "Samoopalacz",
        "quantity": 2,
        "amount": 1180,
        "price": "590",
        "sku": "tno",
        "options": [
          {
            "option": "Pojemność",
            "variant": "100"
          }
        ]
      },
      {
        "name": "Gorący peeling 129zl",
        "quantity": 1,
        "amount": 129,
        "price": "129"
      },
      {
        "name": "Samoopalacz 129zl",
        "quantity": 1,
        "amount": 129,
        "price": "129"
      },
      {
        "name": "Peeling do twarzy 79zl",
        "quantity": 1,
        "amount": 79,
        "price": "79"
      }
    ],
    "amount": "1622.3",
    "subtotal": "1517",
    "delivery": "ubezpieczenie,niespodzianka,gwarancja,express,pobranie",
    "delivery_price": 105.3,
    "delivery_fio": "",
    "delivery_address": "",
    "delivery_comment": ""
  },
  "formid": "form526328071",
  "formname": "Cart"
}
*/ 
