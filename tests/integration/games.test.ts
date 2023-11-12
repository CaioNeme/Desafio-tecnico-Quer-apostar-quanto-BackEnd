import supertest from "supertest";
import app, { init, close } from "@/app";
import { dbClean } from "../helper";
import { gamesFactory } from "../factories/games.factory";

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

describe("POST /games", () => {
  it("should respond with status 201 and create a game", async () => {
    const game = await gamesFactory.createGame();

    const response = await sever.post("/games").send({
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: false,
    });
  });
  it("should respond with status 400 when name is missing", async () => {
    const response = await sever.post("/games").send({
      awayTeamName: "Team B",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "homeTeamName" is required ',
    });
  });
  it("should respond with status 400 when name is not a string", async () => {
    const response = await sever.post("/games").send({
      homeTeamName: 123,
      awayTeamName: "Team B",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "homeTeamName" must be a string ',
    });
  });
});

describe("POST /games/:id/finish", () => {
  it("should respond with status 200 and finish a game", async () => {
    const game = await gamesFactory.createGame();

    const response = await sever.post(`/games/${game.id}/finish`).send({
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore,
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.homeTeamScore,
      isFinished: true,
    });
  });

  it("should respond with status 404 when game not found", async () => {
    const response = await sever.post(`/games/999/finish`).send({
      homeTeamScore: 0,
      awayTeamScore: 0,
    });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Game not found",
    });
  });

  it("should respond with status 400 when homeTeamScore is not a number", async () => {
    const game = await gamesFactory.createGame();

    const response = await sever.post(`/games/${game.id}/finish`).send({
      homeTeamScore: "notNumber",
      awayTeamScore: 0,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "homeTeamScore" must be a number ',
    });
  });

  it("should respond with status 400 when game aready finished", async () => {
    const game = await gamesFactory.finishGame();

    const response = await sever.post(`/games/${game.id}/finish`).send({
      homeTeamScore: game.homeTeamScore,
      awayTeamScore: game.awayTeamScore,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Game already finished",
    });
  });
});

describe("GET /games", () => {
  it("should respond with status 200 and list all games", async () => {
    const game = await gamesFactory.createGame();

    const response = await sever.get("/games");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        homeTeamName: game.homeTeamName,
        awayTeamName: game.awayTeamName,
        homeTeamScore: 0,
        awayTeamScore: 0,
        isFinished: false,
      },
    ]);
  });

  it("should respond with status 200 and empty array when there are no games", async () => {
    const response = await sever.get("/games");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe("GET /games/:id", () => {
  it("should respond with status 200 and list a game", async () => {
    const game = await gamesFactory.createGame();

    const response = await sever.get(`/games/${game.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      homeTeamName: game.homeTeamName,
      awayTeamName: game.awayTeamName,
      homeTeamScore: 0,
      awayTeamScore: 0,
      isFinished: false,
      Bet: expect.any(Array),
    });
  });

  it("should respond with status 404 when game not found", async () => {
    const response = await sever.get(`/games/999`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Game not found",
    });
  });
});
