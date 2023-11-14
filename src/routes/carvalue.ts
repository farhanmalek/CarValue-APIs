import express, { Request, Response } from "express";
import { Router } from "express";

// Create a new Express router for handling car value calculation routes
const valueRouter: Router = express.Router();

// Define the alphabet for later use in calculating the car value
const alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Define the structure of expected parameters in the request body for the car value calculation
interface Car {
  model: string;
  year: number;
}

// Define a POST route for calculating the car value based on the model and year
valueRouter.post("/carvalue", (req: Request, res: Response) => {
  // Extract model and year from the request body using the defined interface
  const { model, year }: Car = req.body;

  // Check if both model and year are provided in the request
  if (!model || !year) {
    res.status(400).json({ error: "Please input a model and year." });
  } else if (year < 1894) {
    // Check for a valid year (considering the invention of the automobile in the late 19th century)
    res.status(400).json({ error: "Please input a valid year above 1893." });
  }

  // Convert the model to an array of uppercase letters, excluding spaces and hyphens
  const wordArray: string[] = model
    .toUpperCase()
    .split("")
    .filter((letter: string) => {
      return letter !== " " && letter !== "-";
    });

  // Convert each letter or digit to its corresponding numerical value and sum them up
  const convertedVal: number = wordArray
    .map((letter: string) => {
      if (alphabet.includes(letter)) {
        // If the character is a letter, return its position in the alphabet
        return alphabet.indexOf(letter) + 1;
      } else {
        // If the character is a digit, parse it as an integer
        return parseInt(letter);
      }
    })
    .reduce((a: number, b: number) => a + b, 0);

  // Calculate the final car value by combining the converted value and the provided year
  const carValue: number = convertedVal * 100 + year;

  // Respond with the calculated car value
  res.json({ carValue });
});

// Export the value router for use in the main application
export default valueRouter;
