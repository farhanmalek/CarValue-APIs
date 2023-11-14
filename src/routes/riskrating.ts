import express, { Request, Response } from "express";
import { Router } from "express";

// Create a new Express router for the risk-related routes
const riskRouter: Router = express.Router();

// Define keywords associated with high-risk claim events
const keyWords: string[] = ["collide", "crash", "scratch", "bump", "smash"];

// Define a POST route for calculating the risk rating
riskRouter.post("/riskrating", (req: Request, res: Response) => {
    // Extract the claim history from the request body
    const { claimHistory }: { claimHistory: string } = req.body;

    // Convert the claim history to lowercase and split it into an array of words
    const ClaimHistoryArray: string[] = claimHistory.toLowerCase().split(" ");

    // Initialize the risk rating to zero
    let riskRating = 0;

    // Iterate through each keyword and each word in the claim history
    
    // Vatthana - Will this handle the case where you got for example 3x times the same word ? like " crash, crash, crash ? As it should only be equal to risk = 1 ?
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
    } else if (riskRating > 5) {
        riskRating = 5;
    }

    // Send the calculated risk rating as JSON response
    res.json({ riskRating: riskRating });
});

// Export the risk router for use in the main application
export default riskRouter;
