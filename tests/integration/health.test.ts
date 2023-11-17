import supertest from 'supertest';
import { dbClean } from '../helper';
import app, { init, close } from '@/app';

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

it('should respond with status 200', async () => {
  const response = await sever.get('/health');

  expect(response.status).toBe(200);
  expect(response.body).toEqual({
    status: 'OK',
  });
});
