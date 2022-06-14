async function query (sql, params = []) {
  try {
    return[null];
  } catch (err) {
    console.error('in db-connect: ' + err);
    throw err;
  }
  
}

export {query}

