"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Create a new Express router for handling car value calculation routes
const valueRouter = express_1.default.Router();
// Define the alphabet for later use in calculating the car value
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
// Define a POST route for calculating the car value based on the model and year
valueRouter.post("/carvalue", (req, res) => {
    // Extract model and year from the request body using the defined interface
    const { model, year } = req.body;
    // Check if both model and year are provided in the request
    if (!model || !year) {
        res.status(400).json({ error: "Please input a model and year." });
    }
    else if (year < 1894) {
        // Check for a valid year (considering the invention of the automobile in the late 19th century)
        res.status(400).json({ error: "Please input a valid year above 1893." });
    }
    // Convert the model to an array of uppercase letters, excluding spaces and hyphens
    const wordArray = model
        .toUpperCase()
        .split("")
        .filter((letter) => {
        return letter !== " " && letter !== "-";
    });
    // Convert each letter or digit to its corresponding numerical value and sum them up
    const convertedVal = wordArray
        .map((letter) => {
        if (alphabet.includes(letter)) {
            // If the character is a letter, return its position in the alphabet
            return alphabet.indexOf(letter) + 1;
        }
        else {
            // If the character is a digit, parse it as an integer
            return parseInt(letter);
        }
    })
        .reduce((a, b) => a + b, 0);
    // Calculate the final car value by combining the converted value and the provided year
    const carValue = convertedVal * 100 + year;
    // Respond with the calculated car value
    res.json({ carValue });
});
// Export the value router for use in the main application
exports.default = valueRouter;
