import express, { Request, Response } from "express";
import { Router } from "express";
const riskRouter: Router = express.Router();

const keyWords: string[] = ["collide","crash","scratch","bump","smash"];

riskRouter.post("/riskrating", (req: Request, res: Response) => {
    const { claimHistory }: { claimHistory: string } = req.body;
    let riskRating = 0;

    const claimHistoryArray: string[] = claimHistory
        .toLowerCase()
        .split(" ");
        console.log(claimHistoryArray);
    
    keyWords.forEach((word) => {
        claimHistoryArray.forEach((claimWord) => {
            if (claimWord.includes(word)) {
                riskRating++;
            }
        })
    })
    if (riskRating < 1) {
        riskRating = 1;
    } else if (riskRating > 5) {
        riskRating = 5;
    }


        res.json({ riskRating: riskRating })

})
























export default riskRouter