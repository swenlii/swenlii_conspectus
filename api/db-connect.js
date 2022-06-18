
const { Pool, Client } = require('pg');

async function query (sql, params = []) {
  console.log(process.env)
  try {
      const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      });
      const res = await pool.query(sql, params);
      return res.rows;
    return null
  } catch (err) {
    console.error('in db-connect: ' + err);
    throw err;
  }
}

export {query}

