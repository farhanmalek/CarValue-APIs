"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const riskRouter = express_1.default.Router();
const keyWords = ["collide", "crash", "scratch", "bump", "smash"];
riskRouter.post("/riskrating", (req, res) => {
    const { claimHistory } = req.body;
    let riskRating = 0;
    const claimHistoryArray = claimHistory
        .toLowerCase()
        .split(" ");
    console.log(claimHistoryArray);
    keyWords.forEach((word) => {
        claimHistoryArray.forEach((claimWord) => {
            if (claimWord.includes(word)) {
                riskRating++;
            }
        });
    });
    if (riskRating < 1) {
        riskRating = 1;
    }
    else if (riskRating > 5) {
        riskRating = 5;
    }
    res.json({ riskRating: riskRating });
});
exports.default = riskRouter;
