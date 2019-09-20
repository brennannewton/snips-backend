const db = require('../db');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

/**
 * Inserts a new author into the database.
 * @param {Author} newAuthor Data about the author
 * @returns {Promise<Snippet>} Created author
 */
exports.insert = async ({ name, password }) => {
  try {
    if (!name || !password)
      throw new ErrorWithHttpStatus('Missing author properties', 400);
    const result = await db.query(
      `INSERT INTO author (name, password) VALUES ($1, $2) RETURNING *`,
      [name, password]
    );
    return result.rows[0];
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
  }
};

/**
 * Selects authors from the database given a name.
 * @param name Name of the author
 * @returns {Promise<Author>} The desired author
 */
exports.select = async name => {
  try {
    const sql = `SELECT * FROM author WHERE name = $1`;
    const result = await db.query(sql, [name]);
    return result.rows[0];
  } catch (err) {
    throw new ErrorWithHttpStatus('Database error');
  }
};
