const { Router } = require('express');
const { Author } = require('../models/Author.js');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const author = await Author.getById(req.params.id);
    res.json(author);
  })
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    const filteredAuthors = authors.map(({ id, name }) => ({ id, name }));
    res.json(filteredAuthors);
  });
