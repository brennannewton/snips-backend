DROP TABLE IF EXISTS snippet;
DROP TABLE IF EXISTS author;
CREATE TABLE author (name TEXT PRIMARY KEY, password TEXT);
CREATE TABLE snippet(
  id SERIAL PRIMARY KEY,
  code TEXT,
  title TEXT,
  description TEXT,
  favorites INT DEFAULT 0,
  author TEXT REFERENCES author,
  language TEXT
);
-- Seed author data
INSERT INTO
  author (name, password)
VALUES
  ('Dandy', 'dean123'),
  ('Scott', 'password');
-- Seed snippet data
INSERT INTO
  snippet (code, title, description, language, author)
VALUES
  (
    'const america = 1776;',
    'Freedom',
    'Delcaring a const variable',
    'javascript',
    'Dandy'
  );