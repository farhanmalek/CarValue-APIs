"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const valueRouter = express_1.default.Router();
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
valueRouter.post("/carvalue", (req, res) => {
    const { model, year } = req.body;
    if (!model || !year) {
        res.status(400).json({ error: "Please input a model and year." });
    }
    else if (year < 1894) {
        res.status(400).json({ error: "Please input a valid year above 1893." });
    }
    const wordArray = model
        .toUpperCase()
        .split("")
        .filter((letter) => {
        return letter !== " " && letter !== "-";
    });
    const convertedVal = wordArray
        .map((letter) => {
        if (alphabet.includes(letter)) {
            return alphabet.indexOf(letter) + 1;
        }
        else {
            return parseInt(letter);
        }
    })
        .reduce((a, b) => a + b, 0);
    const carValue = (convertedVal * 100) + year;
    res.json({ carValue });
});
exports.default = valueRouter;
