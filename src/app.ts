import express, { Express, Request, Response } from "express";
import quoteRouter from "./routes/quote";
import riskRouter from "./routes/riskrating";
import valueRouter from "./routes/carvalue";
const app: Express = express();

//middleware
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the API");

})

//Routes
app.use("/", quoteRouter); //Quotes route
app.use("/", riskRouter); //Risk Rating route
app.use("/", valueRouter); //Car Value route

export default app;