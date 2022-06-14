const constants = process.env.NODE_ENV !== 'production' && process.env._AXIOS_BASE_URL_ !== 'http://localhost:3000/'? process.env : require("../CONSTANTS.js");
const Serverless = require('serverless-postgres');

/*async function query_mysq (sql, params = []) {
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
  
}*/

async function query (sql, params = []) {
  try {
    const client = new Serverless({
      user: process.env.DB_USER ? process.env.DB_USER : constants.DB_USER,
      host: process.env.DB_HOST ? process.env.DB_HOST : constants.DB_HOST,
      database: process.env.DB_NAME ? process.env.DB_NAME : constants.DB_NAME,
      password: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : constants.DB_PASSWORD,
      port: process.env.DB_PORT ? process.env.DB_PORT : constants.DB_PORT,
    });
    await client.connect()
    const res = await client.query(sql, params);
    await client.clean();
    return res.rows;
  } catch (err) {
    console.error('in db-connect: ' + err);
    throw err;
  }
  
}

export {query}

