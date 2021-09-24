const {query} = require("./db-connect");

async function index() {
  let ret = await query('SELECT * FROM guides');
  for(let i = 0; i < ret.length; i++) {
    ret[i].arts = await query('SELECT * FROM articles_for_guides WHERE guide_id = ?', [ret[i].guide_id]);
  }
  return ret;
}

async function get({id}) {
  let ret = await query('SELECT * FROM guides where guide_id = ?', [id]);
  if (ret.length === 0) return null;
  ret[0].arts = await query('SELECT * FROM articles_for_guides WHERE guide_id = ?', [id]);
  return ret[0];
}

async function handbook() {
  return await query(`SELECT * FROM handbooks`);
}

export {index, get, handbook}
