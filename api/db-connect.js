const mysql = require('mysql2/promise');

async function query (sql, params = []) {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "swenlii",
    database: "conspectus",
    password: "O?umAOwbCG{H"
  });

  let [ret] = await connection.query(sql, params);

  connection.end();

  return ret;
}

export {query}

