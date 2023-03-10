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
const errorHandler_1 = __importDefault(require("./helpers/errorHandler"));
dotenv_1.default.config();
const PORT = process_1.default.env.PORT;
const app = (0, express_1.default)();
const cosmeticCosrsOpt = {
    origin: ["pl.robeauty.me"]
};
app.use((0, cors_1.default)(cosmeticCosrsOpt));
app.use(express_1.default.json());
app.use("/api/cosmetics", cosmeticsOrdersRouter_1.default);
app.get("", (req, res) => {
    res.status(200).send("Everything works");
});
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`Server running with port ${PORT}`);
});
