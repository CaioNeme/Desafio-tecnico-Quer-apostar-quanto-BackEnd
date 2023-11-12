import supertest from "supertest";
import app, { init, close } from "@/app";
import { dbClean } from "../helper";
import { participantsFactory } from "../factories/participants.factory";

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

describe("POST /participants", () => {
  it("should respond with status 201 and create a participant", async () => {
    const participant = await participantsFactory.createParticipant();

    const response = await sever.post("/participants").send({
      name: participant.name,
      balance: participant.balance,
    });

    const participantCreated = await participantsFactory.getParticipantById(
      participant.id
    );

    expect(participantCreated).toEqual(participant);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      name: participant.name,
      balance: participant.balance,
    });
  });
  it("should respond with status 400 when name is missing", async () => {
    const response = await sever.post("/participants").send({
      balance: 1000,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "name" is required ',
    });
  });
  it("should respond with status 400 when balance is missing", async () => {
    const response = await sever.post("/participants").send({
      name: "John Doe",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "balance" is required ',
    });
  });
  it("should respond with status 400 when balance is less than 1000", async () => {
    const response = await sever.post("/participants").send({
      name: "John Doe",
      balance: 500,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "balance" must be greater than or equal to 1000 ',
    });
  });
  it("should respond with status 400 when name is not a string", async () => {
    const response = await sever.post("/participants").send({
      name: 123,
      balance: 1000,
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "name" must be a string ',
    });
  });
  it("should respond with status 400 when balance is not a number", async () => {
    const response = await sever.post("/participants").send({
      name: "John Doe",
      balance: "notNumber",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Invalid data: "balance" must be a number ',
    });
  });
});

describe("GET /participants", () => {
  it("should respond with status 200 and list all participants", async () => {
    const participant = await participantsFactory.createParticipant();

    const response = await sever.get("/participants");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        name: participant.name,
        balance: participant.balance,
      },
    ]);
  });
  it("should respond with status 200 and empty array when there are no participants", async () => {
    const response = await sever.get("/participants");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
