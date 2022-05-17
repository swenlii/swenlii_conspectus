const mysql = require('mysql2/promise');

async function query (sql, params = []) {
  try {
    const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "swenlii",
    database: "conspectus",
    password: "O?umAOwbCG{H"
  });

  connection.connect((err) => {
    if(err){
      console.log('ERROR when connection to database');
    }
    console.log('I am here');
  });

  console.log('error not found')

  let [ret] = await connection.query(sql, params);

  connection.end();
  return ret;
  } catch (err) {
    console.error(err);
    throw err;
  }
  
}

export {query}

