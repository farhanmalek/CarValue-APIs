import express, { Request, Response } from "express";
import { Router } from "express";

// Create a new Express router for handling insurance quote-related routes
const quoteRouter: Router = express.Router();

// Define the structure of expected parameters in the request body
interface RiskParams {
  carValue: number | string;
  riskRating: number | string;
}

// Define a POST route for generating an insurance quote
quoteRouter.post("/quote", (req: Request, res: Response) => {
  // Extract car value and risk rating from the request body using the defined interface
  const { carValue, riskRating }: RiskParams = req.body;

  // Parse car value and risk rating to ensure they are valid numbers
  const parsedCarValue = parseFloat(String(carValue));
  const parsedRiskRating = parseFloat(String(riskRating));

  // Check for invalid inputs or out-of-range risk rating
  if (
    isNaN(parsedCarValue) ||
    isNaN(parsedRiskRating) ||
    parsedRiskRating < 1 ||
    parsedRiskRating > 5
  ) {
    // Respond with an error message if inputs are invalid
    res.json({
      error:
        "Invalid Inputs provided. Ensure your inputs are numbers, both carValue and riskRating are supplied, and risk rating is between 1-5.",
    });
  } else {
    // Calculate initial yearly premium based on car value and risk rating
    const initialYearlyPremium = (parsedCarValue * parsedRiskRating) / 100;

    // Round the calculated yearly premium to two decimal places
    const yearlyPremium = Number(initialYearlyPremium.toFixed(2));

    // Calculate initial monthly premium based on the yearly premium
    const initialMonthlyPremium = yearlyPremium / 12;

    // Round the calculated monthly premium to two decimal places
    const monthlyPremium = Number(initialMonthlyPremium.toFixed(2));

    // Respond with the calculated monthly and yearly premiums
    res.json({ monthlyPremium, yearlyPremium });
  }
});

// Export the quote router for use in the main application
export default quoteRouter;
