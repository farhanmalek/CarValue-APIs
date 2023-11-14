import express, { Request, Response } from "express";
import { Router } from "express";
const quoteRouter: Router = express.Router();

interface RiskParams {
  carValue: number | string;
  riskRating: number | string;
}

quoteRouter.post("/quote", (req: Request, res: Response) => {
  const { carValue, riskRating }: RiskParams = req.body;

  const parsedCarValue = parseFloat(String(carValue));
  const parsedRiskRating = parseFloat(String(riskRating));

  if (
    isNaN(parsedCarValue) ||
    isNaN(parsedRiskRating) ||
    parsedRiskRating < 1 ||
    parsedRiskRating > 5
  ) {
    res.json({ error: "Invalid Inputs provided, ensure your inputs are numbers, both carValue and riskRating is supplied and risk rating is between 1-5" });
  } else {
    const initialYearlyPremium = (parsedCarValue * parsedRiskRating) / 100;
    const yearlyPremium = Number(initialYearlyPremium.toFixed(2));
    const initialMonthlyPremium = yearlyPremium / 12;
    const monthlyPremium = Number(initialMonthlyPremium.toFixed(2));

    res.json({ monthlyPremium, yearlyPremium });
  }
});


export default quoteRouter;