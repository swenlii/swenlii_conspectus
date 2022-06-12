const constants = require("../CONSTANTS.js");
const { Client } = require('pg')

async function query_mysq (sql, params = []) {
  try {
    const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "swenlii",
    database: "conspectus",
    password: "O?umAOwbCG{H"
  });

  let [ret] = await connection.query(sql, params);

  connection.end();
  return ret;
  } catch (err) {
    console.error('in db-connect: ' + err);
    throw err;
  }
  
}

async function query (sql, params = []) {
  try {
    const client = new Client({
      user: constants.db_user,
      host: constants.db_host,
      database: constants.db_name,
      password: constants.db_pass,
      port: constants.db_port,
    });
    await client.connect()
    const res = await client.query(sql, params);
    await client.end();
    return res.rows;
  } catch (err) {
    console.error('in db-connect: ' + err);
    throw err;
  }
  
}

export {query}

