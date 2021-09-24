const {query} = require("./db-connect");

async function index() {
  return await query('SELECT *, DATE_FORMAT(date, "%d.%m.%Y") AS date2 FROM articles');
}

async function comments({id}) {
  return await query(`SELECT * FROM comments WHERE art_id = ?`,[id]);
}

async function get({id}) {

  let art = await query(`SELECT *, DATE_FORMAT(date, '%d.%m.%Y') AS date2 FROM articles WHERE art_id = ?`, [id]);
  return art[0];
}

async function sim_arts({ids}) {
  let sim = [];
  let sims = ids.split(',');
  for(let i = 0; i < sims.length; i++) {
    let ret = await query('SELECT art_id, description AS `desc`, title FROM articles WHERE art_id = ?', [sims[i]]);
    sim.push(ret[0]);
  }
  return sim;
}

async function addPopularity ({id}) {
  await query (`UPDATE articles SET popularity = popularity + 1 WHERE art_id = ?`, [id]);
}

async function last () {
  return await query(`SELECT * FROM articles WHERE date = (SELECT max(date) FROM articles)`);
}

async function best () {
  return await query(`SELECT * FROM articles WHERE popularity = (SELECT max(popularity) FROM articles)`);
}

export {index, comments, get, sim_arts, addPopularity, last, best}
