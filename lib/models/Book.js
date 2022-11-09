const authors = require('../controllers/authors.js');
const pool = require('../utils/pool');
// const { Author } = require('./Author.js');

class Book {
  id;
  title;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.released = row.released;
    this.writtenBy = row.written_by;
    // this.authors =
    //   row.authors.length > 0
    //     ? row.authors.map((author) => new Author(author))
    //     : [];
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT books.*,
    COALESCE(json_agg(to_jsonb(authors))
              FILTER (WHERE authors.id IS NOT NULL), '[]') as written_by
              FROM books
              LEFT JOIN authors_and_books
              ON books.id = authors_and_books.book_id
              LEFT JOIN authors
              on authors_and_books.author_id = authors.id
              WHERE books.id = $1
              Group by books.id
              Order by books.id
  `,
      [id]
    );

    return new Book(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * from books');
    return rows.map((row) => new Book(row));
  }
}

module.exports = { Book };
