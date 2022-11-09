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
  });

  it('/authors/:id route should return a specific author and some of the books they have written', async () => {
    const res = await request(app).get('/authors/1');
    const morrisonDetails = res.body;
    expect(morrisonDetails).toHaveProperty('name', 'Toni Morrison');
    expect(morrisonDetails).toHaveProperty('dob', '1931-02-18T08:00:00.000Z');
    expect(morrisonDetails.books[0]).toHaveProperty('title');
    expect(morrisonDetails.books[0]).toHaveProperty('released');
    expect(morrisonDetails.books[0]).toHaveProperty('id');
  });
});

afterAll(() => {
  pool.end();
});
