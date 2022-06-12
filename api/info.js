const {query} = require("./db-connect");
let {createTransport} = require('nodemailer');
const constants = require("../CONSTANTS.js");

async function categories() {
  return await query('SELECT * FROM categories');
}

async function library() {
  return await query('SELECT * FROM articles WHERE lib = 1');
}

async function comment ({user, text, art_id}) {
  await query (`UPDATE articles SET popularity = popularity + 1 WHERE art_id = $1`, [art_id]);
  await query(`INSERT INTO comments (user, text, art_id) VALUES ($1, $2, $3)`, [user, text, art_id]);
}

async function subscribe ({email}) {
  await query(`INSERT INTO emails (email) VALUES ($1)`, [email]);
}

async function changes () {
  return await query(`SELECT *, TO_CHAR(date, 'DD Mon YYYY') AS date2 FROM changes ORDER BY date DESC`);
}

async function randomArt () {
  return await query(`SELECT * FROM articles ORDER BY RANDOM() limit 1;`);
}

async function sendMail ({name, email, title, mail, page}) {
  let transporter = createTransport({
    host: constants.mail_host,
    port: constants.mail_port,
    secure: true,
    auth: {
      user: constants.mail_user,
      pass: constants.mail_pass
    }
  });
  try {
    await transporter.sendMail({
      from: constants.mail_user,
      sender: email,
      to: constants.mail_user,
      subject: title,
      html: require('../static/mail.js').mail("Новое письмо для тебя!", "<p>*Письмо направилено со страницы '" + page + "' в conspectus</p><h1 style='font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif; font-size: 2em; font-weight: 700; letter-spacing: 0.02em;'>" + title + "</h1><p><h3 style='font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif; font-size: 1.5em; font-weight: 700; letter-spacing: 0.02em;'>Name sender:</h3>" + name + "</p><p><h3 font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif; font-size: 1.5em; font-weight: 700; letter-spacing: 0.02em;>Email for answer:</h3>" + email + "</p><p><h3 font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif; font-size: 1.5em; font-weight: 700; letter-spacing: 0.02em;>Text:</h3><pre>" + mail + "</pre></p>"),
    });
  } catch (e) {
    return e.message;
  }
  return 'ok';
}

async function adminLogin ({name, password}) {
  let adm = await query(`SELECT * FROM users WHERE id = 1`)
  if (process.env.NODE_ENV === 'development') return 'ok';
   else console.log('not dev');
  if (name === adm[0].login && password === adm[0].password)
    return "ok"
  else return "error"
}

async function addcat({catLink, catName}) {
  let art = await query(`INSERT INTO categories (link, text) VALUES ($1, $2)`, [
    catLink, catName ]);
  return 'ok'
}

async function addchanges({changesName, changesText}) {
  let art = await query(`INSERT INTO changes (title, html) VALUES ($1, $2)`, [
    changesName, changesText ]);

  let transporter = createTransport({
    host: constants.mail_host,
    port: constants.mail_port,
    secure: true,
    auth: {
      user: constants.mail_user,
      pass: constants.mail_pass
    }
  });

  let mails = await query(`SELECT * FROM emails`);
  for(let i = 0; i < mails.length; i++) {
    try {
      await transporter.sendMail({
        from: constants.mail_user,
        sender: constants.mail_user,
        to: mails[i].email,
        subject: changesName,
        html: require('../static/mail.js').mail("Обновление сайта!", "<p>На сайте Conspectus новые изменения!</p> <h4 style=\"font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif; font-size: 1.5em; font-weight: 700; letter-spacing: 0.02em;\">" + changesName + "</h4> <p>Что изменилось:</p>" + changesText),
      });
    } catch (e) {
      return e.message;
    }
  }
  
  return 'ok'
}

async function checkconection () {
  try {
    const { Client } = require('pg');
    const client = new Client({
      user: constants.db_user,
      host: constants.db_host,
      database: constants.db_name,
      password: constants.db_pass,
      port: constants.db_port,
    });
    await client.connect();
    await client.end();
    return 'ok'

  } catch (err) {
    return (err.message);
  }
}

export {categories, library, comment, subscribe, sendMail, randomArt, changes, adminLogin, addcat, addchanges, checkconection}
