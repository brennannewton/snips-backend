/* eslint-disable no-prototype-builtins */

const format = require('pg-format');
const db = require('../db');
const { readJsonFromDb, writeJsonToDb } = require('../utils/db.utils');
const ErrorWithHttpStatus = require('../utils/ErrorWithHttpStatus');

/**
 * @typedef {Object} Snippet
 * @property {string} id
 * @property {string} author
 * @property {string} code
 * @property {string} title
 * @property {string} description
 * @property {string} language
 * @property {string[]} comments
 * @property {number} favorites
 */

/**
 * Inserts a new snippet into db.
 * @param {Snippet} newSnippet Data to create snippet
 * @returns {Promise<Snippet>} Created snippet
 */
exports.insert = async ({ author, code, title, description, language }) => {
  try {
    if (!author || !code || !title || !description || !language)
      throw new ErrorWithHttpStatus('Invalid snip properties', 400);
    await db.query(
      `INSERT INTO snippet (code, title, description, author, language)
      VALUES ($1, $2, $3, $4, $5)`,
      [code, author, title, description, language]
    );
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
  }
};

/**
 * Selects snippets from db.
 * Accepts optional query object to filter results.
 * @param {Object} [query]
 * @returns {Promise<Snippet[]>} Array of snippet objects
 */
exports.select = async query => {
  try {
    const whereClause = Object.keys(query)
      .map((_, i) => `%I = $${i + 1}`)
      .join(' AND ');
    const sql = format(
      `SELECT * FROM snippet ${
        whereClause.length ? `WHERE ${whereClause}` : ''
      } ORDER BY id`,
      ...Object.keys(query)
    );
    const result = await db.query(sql, Object.values(query));
    return result.rows;
    // const keys = Object.keys(query);
    // if (keys.length > 0) {
    //   const vals = Object.values(query);
    //   const params = [];
    //   const queries = [];
    //   for (let i = 1; i <= keys.length; i++) {
    //     params.push(`${keys[i - 1]} = $${i}`);
    //     queries.push(`${vals[i - 1]}`);
    //   }
    //   const queryText = `SELECT * FROM snippet WHERE ${params.join(' AND ')}`;
    //   const queryResult = await db.query(queryText, params);
    //   return queryResult.rows;
    // }
    // const noQueryResult = await db.query('SELECT * FROM snippet');
    // return noQueryResult.rows;
  } catch (err) {
    throw new ErrorWithHttpStatus('Database error');
  }
};

/**
 * Updates snippet at specified id with new data
 * @returns Updated snippet
 */
exports.update = async ({ id }, newData) => {
  try {
    Object.keys(newData).forEach(key => {
      db.query(`UPDATE snippet SET ${key} = $1 WHERE id = $2`, [
        newData[key],
        id,
      ]);
    });
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
  }
};

/**
 * Deletes a specified snippet from the db.
 * @param {string} id Unique snippet identifier
 */
exports.delete = async ({ id }) => {
  try {
    const result = await db.query(`DELETE FROM snippet WHERE id = $1`, [id]);
    if (result.rowCount === 0) {
      throw new ErrorWithHttpStatus('ID does not exist', 404);
    }
  } catch (err) {
    if (err instanceof ErrorWithHttpStatus) throw err;
    else throw new ErrorWithHttpStatus('Database error');
  }
};
