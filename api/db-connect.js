const Serverless = require('serverless-postgres');

async function query (sql, params = []) {
  try {
    const client = new Serverless({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
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

