import { createBet } from "@/controllers/bet.controllers";
import { validateBody } from "@/middlewares/validation";
import { betSchemas } from "@/schema/betSchemas";
import { Router } from "express";

const betRouter = Router();

betRouter.post("/bets", validateBody(betSchemas.createBet), createBet);

export default betRouter;
