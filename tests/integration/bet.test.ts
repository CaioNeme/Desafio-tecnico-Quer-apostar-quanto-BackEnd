import supertest from "supertest";
import app, { init, close } from "@/app";
import { dbClean } from "../helper";
import { betFactory } from "../factories/bets.factory";

const sever = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await dbClean();
});

afterAll(async () => {
  await close();
});

describe("POST /bets", () => {
  it("should respond with status 201 and create a bet", async () => {
    const bet = await betFactory.createBet();

    const response = await sever.post("/bets").send({
      homeTeamScore: bet.homeTeamScore,
      awayTeamScore: bet.awayTeamScore,
      amountBet: bet.amountBet,
      gameId: bet.gameId,
      participantId: bet.participantId,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      homeTeamScore: bet.homeTeamScore,
      awayTeamScore: bet.awayTeamScore,
      amountBet: bet.amountBet,
      gameId: bet.gameId,
      participantId: bet.participantId,
      status: "PENDING",
      amountWon: null,
    });
  });
  it("should respond with status 404 when game not found", async () => {
    const bet = await betFactory.createBet();

    const response = await sever.post("/bets").send({
      homeTeamScore: bet.homeTeamScore,
      awayTeamScore: bet.awayTeamScore,
      amountBet: bet.amountBet,
      gameId: 999,
      participantId: bet.participantId,
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Game not found",
    });
  });
  it("should respond with status 404 when participant not found", async () => {
    const bet = await betFactory.createBet();

    const response = await sever.post("/bets").send({
      homeTeamScore: bet.homeTeamScore,
      awayTeamScore: bet.awayTeamScore,
      amountBet: bet.amountBet,
      gameId: bet.gameId,
      participantId: 999,
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Participant not found",
    });
  });
  it("should respond with status 400 when homeTeamScore is missing", async () => {
    const bet = await betFactory.createBet(null, 0, 1000);

    const response = await sever.post("/bets").send({
      awayTeamScore: bet.awayTeamScore,
      amountBet: bet.amountBet,
      gameId: bet.gameId,
      participantId: bet.participantId,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "homeTeamScore" is required ',
    });
  });
  it("should respond with status 400 when awayTeamScore is missing", async () => {
    const bet = await betFactory.createBet(0, null, 1000);

    const response = await sever.post("/bets").send({
      homeTeamScore: bet.homeTeamScore,
      amountBet: bet.amountBet,
      gameId: bet.gameId,
      participantId: bet.participantId,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "awayTeamScore" is required ',
    });
  });
  it("should respond with status 400 when amountBet is missing", async () => {
    const bet = await betFactory.createBet(0, 0, null);

    const response = await sever.post("/bets").send({
      homeTeamScore: bet.homeTeamScore,
      awayTeamScore: bet.awayTeamScore,
      gameId: bet.gameId,
      participantId: bet.participantId,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "amountBet" is required ',
    });
  });
  it("should respond with status 400 when gameId is missing", async () => {
    const bet = await betFactory.createBet();

    const response = await sever.post("/bets").send({
      homeTeamScore: bet.homeTeamScore,
      awayTeamScore: bet.awayTeamScore,
      amountBet: bet.amountBet,
      participantId: bet.participantId,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "gameId" is required ',
    });
  });
  it("should respond with status 400 when participantId is missing", async () => {
    const bet = await betFactory.createBet();

    const response = await sever.post("/bets").send({
      homeTeamScore: bet.homeTeamScore,
      awayTeamScore: bet.awayTeamScore,
      amountBet: bet.amountBet,
      gameId: bet.gameId,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "participantId" is required ',
    });
  });
});
