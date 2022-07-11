const {query} = require("./db-connect");
var fs = require('fs');
let nodemailer = require('nodemailer');

async function index() {
  return await query('SELECT *, TO_CHAR(date, \'DD Mon YYYY\') AS date2 FROM articles');
}

async function comments({id}) {
  return await query(`SELECT * FROM comments WHERE art_id = $1`,[id]);
}

async function get({id}) {

  let art = await query(`SELECT *, TO_CHAR(date, 'DD Mon YYYY') AS date2 FROM articles WHERE art_id = $1`, [id]);
  return art[0];
}

async function add({artId, artName, artDesc, artKeys, artTags, artSim, artCat, artLib, artImg, artText, artDop, artDopCon}) {

  let ifexist = await query(`SELECT * FROM articles WHERE art_id = $1 OR title = $2`, [artId, artName]);

  if (ifexist.length > 0) {
    return "Error! Такая статья уже существует! Найдена статья: " + ifexist[0].art_id + " / " + ifexist[0].title;
  }

  console.log(artCat, artName, artTags, artSim);

  let art = await query(`INSERT INTO articles (art_id, title, description, file, img, categories, tags, sim_arts, dopcon, dopconarr, lib, keywords, html ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`, [
    artId, artName, artDesc, artId + '.js', artImg, artCat, artTags && artTags.length > 0 ? artTags : null, artSim && artSim.length > 0 ? artSim : null, artDop ? 1 : 0, artDopCon ? artDopCon : null, artLib ? 1 : 0, artKeys, artText ]);
  
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  let cat = await query(`SELECT text FROM categories WHERE link = $1`, [artCat]);
  let mails = await query(`SELECT * FROM emails`);
  for(let i = 0; i < mails.length; i++) {
    try {
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        sender: process.env.MAIL_SEND,
        to: mails[i].email,
        subject: artName,
        html: require('../static/mail.js').mail("Статья специально для тебя!", "<p>На сайте Conspectus новая статья! На этот раз на тему «" + cat[0].text + "»</p> <h4 style=\"font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif; font-size: 1.5em; font-weight: 700; letter-spacing: 0.02em;\">" + artName + "</h4> <p>" + artDesc + "</p>"),
      });
    } catch (e) {
      return e.message;
    }
  }

    return 'ok';
}

async function edit({artId, artName, artDesc, artKeys, artTags, artSim, artCat, artLib, artImg, artText, artDop, artDopCon}) {

  let art = await query(`UPDATE articles SET title = $1, description = $2, img = $3, categories = $4, tags = $5, sim_arts = $6, dopcon = $7, dopconarr = $8, lib = $9, keywords = $10, html = $11 WHERE art_id = $12`, [
    artName, artDesc, artImg, artCat, artTags && artTags.length > 0 ? artTags : null, artSim && artSim.length > 0 ? artSim : null, artDop, artDopCon ? artDopCon : null, artLib, artKeys, artText, artId ]);

  return 'ok';
}

async function sim_arts({ids}) {
  let sim = [];
  let sims = ids.split(',');
  for(let i = 0; i < sims.length; i++) {
    let ret = await query('SELECT art_id, description, title FROM articles WHERE art_id = $1', [sims[i]]);
    if (ret[0])
      sim.push(ret[0]);
  }
  return sim;
}

async function addPopularity ({id}) {
  await query (`UPDATE articles SET popularity = popularity + 1 WHERE art_id = $1`, [id]);
}

async function last () {
  return await query(`SELECT * FROM articles WHERE date = (SELECT max(date) FROM articles)`);
}

async function best () {
  return await query(`SELECT * FROM articles WHERE popularity = (SELECT max(popularity) FROM articles)`);
}

async function delart ({id, img}) {
  await query (`DELETE FROM comments WHERE art_id = $1`, [id]);
  if (fs.existsSync(`static/articles/${id}.js`)) {
    fs.unlinkSync(`static/articles/${id}.js`);
  }
  if (img && fs.existsSync(`static/images/${img}`)) {
    fs.unlinkSync(`static/images/${img}`);
  }
  await query (`DELETE FROM articles WHERE art_id = $1`, [id]);
  return 'ok'
}

export {index, comments, get, sim_arts, addPopularity, last, best, add, delart, edit}
