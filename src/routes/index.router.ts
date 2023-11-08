import { Router } from "express";
import healthRouter from "./health.router";
import participantsRouter from "./participants.router";

const router = Router();

router.use(healthRouter);
router.use(participantsRouter);

export default router;
