"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const process_1 = __importDefault(require("process"));
const cors_1 = __importDefault(require("cors"));
const cosmeticsOrdersRouter_1 = __importDefault(require("./routers/cosmeticsOrdersRouter"));
dotenv_1.default.config();
const PORT = process_1.default.env.PORT;
const app = (0, express_1.default)();
let cosmeticCosrsOpt = {
    origin: ["https://pl.robeauty.me"]
};
app.use((0, cors_1.default)(cosmeticCosrsOpt));
app.use("/api/cosmetics", cosmeticsOrdersRouter_1.default);
app.get("", (req, res) => {
    res.status(200).send("Everything works");
});
app.listen(PORT, () => {
    console.log(`Server running with port ${PORT}`);
});
