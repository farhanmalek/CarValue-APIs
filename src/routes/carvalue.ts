import express, { Request, Response } from "express";
import { Router } from "express";
const valueRouter: Router = express.Router();
const alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
interface Car {
  model: string;
  year: number;
}

valueRouter.post("/carvalue", (req: Request, res: Response) => {
  const { model, year }: Car = req.body;
  if (!model || !year) {
    res.status(400).json({ error: "Please input a valid model and year." });
  } else if (year < 1894) {
    res.status(400).json({ error: "Please input a valid year above 1893." });
  }
  const wordArray: string[] = model
    .toUpperCase()
    .split("")
    .filter((letter: string) => {
      return letter !== " " && letter !== "-";
    });
    console.log(wordArray)

  const convertedVal: number = wordArray
    .map((letter: string) => {
      if (alphabet.includes(letter)) {
        return alphabet.indexOf(letter) + 1;
      } else {
        return parseInt(letter);
      }
    })
    .reduce((a: number, b: number) => a + b, 0);
    console.log(convertedVal)
  const carValue: number = (convertedVal * 100) + year;
  res.json({ carValue });
});

export default valueRouter;
