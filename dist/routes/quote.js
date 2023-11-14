"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quoteRouter = express_1.default.Router();
quoteRouter.post("/quote", (req, res) => {
    const { carValue, riskRating } = req.body;
    const parsedCarValue = parseFloat(String(carValue));
    const parsedRiskRating = parseFloat(String(riskRating));
    if (isNaN(parsedCarValue) ||
        isNaN(parsedRiskRating) ||
        parsedRiskRating < 1 ||
        parsedRiskRating > 5) {
        res.json({ error: "Invalid Inputs provided, ensure your inputs are numbers, both carValue and riskRating is supplied and risk rating is between 1-5" });
    }
    else {
        const initialYearlyPremium = (parsedCarValue * parsedRiskRating) / 100;
        const yearlyPremium = Number(initialYearlyPremium.toFixed(2));
        const initialMonthlyPremium = yearlyPremium / 12;
        const monthlyPremium = Number(initialMonthlyPremium.toFixed(2));
        res.json({ monthlyPremium, yearlyPremium });
    }
});
exports.default = quoteRouter;
