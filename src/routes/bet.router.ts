import { createBet } from "@/controllers/bet.controllers";
import { Router } from "express";

const betRouter = Router();

betRouter.post("/bets", createBet);

export default betRouter;
