require('dotenv').config();
const request = require('supertest');
const app = require('../app');
const dbInit = require('../db/init');
const db = require('../db/index');

beforeAll(async () => {
  await dbInit.createTables();
  await dbInit.seedAuthors();
  await dbInit.seedSnippets();
});

describe('Snippets', () => {
  describe('GET /api/snippets', () => {
    it('should get all the snips', async () => {
      const response = await request(app).get('/api/snippets');
      expect(response.body.length).toBe(2);
      expect(response.error).toBeFalsy();
      expect(response.status).toBe(200);
      expect(response.body).toMatchSnapshot();
    });
  });
});

afterAll(() => {
  db.end();
});
