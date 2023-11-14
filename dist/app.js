"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quote_1 = __importDefault(require("./routes/quote"));
const riskrating_1 = __importDefault(require("./routes/riskrating"));
const carvalue_1 = __importDefault(require("./routes/carvalue"));
const app = (0, express_1.default)();
//middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Routes
app.use("/", quote_1.default); //Quotes route
app.use("/", riskrating_1.default); //Risk Rating route
app.use("/", carvalue_1.default); //Car Value route
exports.default = app;
