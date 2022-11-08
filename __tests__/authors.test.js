const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('authors routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('/authors route should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(5);
    const morrison = res.body.find((char) => char.id === '1');
    expect(morrison).toHaveProperty('name', 'Toni Morrison');
    expect(morrison).toHaveProperty('dob', 1911);
  });
});

afterAll(() => {
  pool.end();
});
