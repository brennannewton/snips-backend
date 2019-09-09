DROP TABLE IF EXISTS snippet;
CREATE TABLE snippet(
    id SERIAL PRIMARY KEY,
    code TEXT,
    title TEXT,
    description TEXT,
    favorites INT DEFAULT 0,
    author TEXT,
    language TEXT
);

INSERT INTO snippet (code, title, description, language, author)
VALUES ('const america = 1776;', 'Freedom', 'Delcaring a const variable', 'javascript', 'Brennan');