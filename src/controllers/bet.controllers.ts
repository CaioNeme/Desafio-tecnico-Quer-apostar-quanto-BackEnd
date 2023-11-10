import { betService } from "@/services/bet.services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createBet(req: Request, res: Response) {
  const { homeTeamScore, awayTeamScore, amountBet, gameId, participantId } =
    req.body;

  const bet = await betService.createBet(
    Number(homeTeamScore),
    Number(awayTeamScore),
    Number(amountBet),
    Number(gameId),
    Number(participantId)
  );

  res.status(httpStatus.CREATED).send(bet);
}
