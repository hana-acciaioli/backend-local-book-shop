const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/books route should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(10);
    const beloved = res.body.find((char) => char.id === '1');
    expect(beloved).toHaveProperty('title', 'Beloved');
    expect(beloved).toHaveProperty('released', 1987);
  });
  afterAll(() => {
    pool.end();
  });
});
