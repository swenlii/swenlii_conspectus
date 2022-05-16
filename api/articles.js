const {query} = require("./db-connect");
var fs = require('fs');
let nodemailer = require('nodemailer');

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

async function add({artId, artName, artDesc, artKeys, artTags, artSim, artCat, artLib, artImg, artText, artDop, artDopCon}) {

  let ifexist = await query(`SELECT * FROM articles WHERE art_id = ? OR title = ?`, [artId, artName]);

  if (ifexist.length > 0) {
    return "Error! Такая статья уже существует! Найдена статья: " + ifexist[0].art_id + " / " + ifexist[0].title;
  }

  fs.writeFile(`static/articles/${artId}.js`, `let code = \`${artText}\`; export {code}`, function (err) {
    if (err) throw err;
  });
  
  // TODO подумать над изображениями

  console.log(artCat, artName, artTags, artSim);

  let art = await query(`INSERT INTO articles (art_id, title, description, file, img, categories, tags, sim_arts, dopcon, dopconarr, lib, keywords ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
    artId, artName, artDesc, artId + '.js', artImg, artCat, artTags && artTags.length > 0 ? artTags : null, artSim && artSim.length > 0 ? artSim : null, artDop, artDopCon ? artDopCon : null, artLib, artKeys ]);
  
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'swenliw@gmail.com',
      pass: 'lujngpcwvhnhimjr'
    }
  });
  let cat = await query(`SELECT text FROM categories WHERE link = ?`, [artCat]);
  let mails = await query(`SELECT * FROM emails`);
  for(let i = 0; i < mails.length; i++) {
    try {
      await transporter.sendMail({
        from: 'swenliw@gmail.com',
        sender: 'swenliw@gmail.com',
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

  fs.writeFile(`static/articles/${artId}.js`, `let code = \`${artText}\`; export {code}`, function (err) {
    if (err) throw err;
  });
  
  // TODO подумать над изображениями

  let art = await query(`UPDATE articles SET title = ?, description = ?, img = ?, categories = ?, tags = ?, sim_arts = ?, dopcon = ?, dopconarr = ?, lib = ?, keywords = ? WHERE art_id = ?`, [
    artName, artDesc, artImg, artCat, artTags && artTags.length > 0 ? artTags : null, artSim && artSim.length > 0 ? artSim : null, artDop, artDopCon ? artDopCon : null, artLib, artKeys, artId ]);


  return 'ok';
}

async function sim_arts({ids}) {
  let sim = [];
  let sims = ids.split(',');
  for(let i = 0; i < sims.length; i++) {
    let ret = await query('SELECT art_id, description AS `desc`, title FROM articles WHERE art_id = ?', [sims[i]]);
    if (ret[0])
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

async function delart ({id, img}) {
  await query (`DELETE FROM comments WHERE art_id = ?`, [id]);
  if (fs.existsSync(`static/articles/${id}.js`)) {
    fs.unlinkSync(`static/articles/${id}.js`);
  }
  if (img && fs.existsSync(`static/images/${img}`)) {
    fs.unlinkSync(`static/images/${img}`);
  }
  await query (`DELETE FROM articles WHERE art_id = ?`, [id]);
  return 'ok'
}

export {index, comments, get, sim_arts, addPopularity, last, best, add, delart, edit}
