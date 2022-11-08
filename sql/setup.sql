-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors CASCADE;
DROP TABLE IF EXISTS books CASCADE;
DROP TABLE IF EXISTS authors_and_books;

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR NOT NULL,
    dob INT,
    pob VARCHAR

);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR NOT NULL,
    released INT NOT NULL
);

CREATE TABLE authors_and_books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    author_id BIGINT NOT NULL,
    book_id BIGINT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (author_id) REFERENCES authors(id)
);

INSERT INTO authors(
    name,
    dob,
    pob
)
VALUES
('Toni Morrison', 1931-02-18, 'Lorain Ohio' ),
('Hermann Hesse', 1877-07-02, 'calw Germany'),
('Alice Walker', 1944-02-09, 'Eatonton GA'),
('Allison Larkin', 1963-04-28, 'England' ),
('Frank Herbert', 1920-10-08, 'Tacoma Washington');

INSERT INTO books(
    title,
    released
)
VALUES
('Beloved', 1987),
('Jazz', 1992),
('Siddhartha', 1922),
('The Color Purple', 1982),
('The Temple of My Familiar', 1989),
('The Poeple We Keep', 2021),
('Dune Messiah', 1969),
('Dune World', 1963),
('The Prophet of Dune', 1965),
('Children of Dune', 1976);

INSERT INTO authors_and_books(
    book_id,
    author_id
)
VALUES
(1,1),
(2,1),
(3,2),
(4,3),
(5,3),
(6,4),
(7,5),
(8,5),
(9,5),
(10,5);

