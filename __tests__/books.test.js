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

  it('/books/:id route should return a specific book and the author details', async () => {
    const res = await request(app).get('/books/1');
    const belovedDetails = res.body;
    expect(belovedDetails).toHaveProperty('title', 'Beloved');
    expect(belovedDetails).toHaveProperty('released', 1987);
    expect(belovedDetails.authors[0]).toHaveProperty('name');
    expect(belovedDetails.authors[0]).toHaveProperty('id');
    expect(belovedDetails.authors[0]).toHaveProperty('dob');
  });
});

afterAll(() => {
  pool.end();
});
