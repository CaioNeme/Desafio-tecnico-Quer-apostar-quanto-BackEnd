import { Router } from "express";
import healthRouter from "./health.router";
import participantsRouter from "./participants.router";
import gameRouter from "./games.router";
import betRouter from "./bet.router";

const router = Router();

router.use(healthRouter);
router.use(participantsRouter);
router.use(gameRouter);
router.use(betRouter);

export default router;
