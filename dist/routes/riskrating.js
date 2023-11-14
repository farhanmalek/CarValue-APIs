"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Create a new Express router for the risk-related routes
const riskRouter = express_1.default.Router();
// Define keywords associated with high-risk claim events
const keyWords = ["collide", "crash", "scratch", "bump", "smash"];
// Define a POST route for calculating the risk rating
riskRouter.post("/riskrating", (req, res) => {
    // Extract the claim history from the request body
    const { claimHistory } = req.body;
    // Convert the claim history to lowercase and split it into an array of words
    const ClaimHistoryArray = claimHistory.toLowerCase().split(" ");
    // Initialize the risk rating to zero
    let riskRating = 0;
    // Iterate through each keyword and each word in the claim history
    keyWords.forEach((word) => {
        ClaimHistoryArray.forEach((claimWord) => {
            // Check if the current claim word includes the current keyword
            if (claimWord.includes(word)) {
                // If so, increment the risk rating
                riskRating++;
            }
        });
    });
    // Ensure that the risk rating is within a reasonable range (1 to 5)
    if (riskRating < 1) {
        riskRating = 1;
    }
    else if (riskRating > 5) {
        riskRating = 5;
    }
    // Send the calculated risk rating as JSON response
    res.json({ riskRating: riskRating });
});
// Export the risk router for use in the main application
exports.default = riskRouter;
