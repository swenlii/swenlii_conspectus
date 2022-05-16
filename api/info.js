const {query} = require("./db-connect");
const mysql = require('mysql2/promise');
let nodemailer = require('nodemailer');

async function categories() {
  return await query('SELECT * FROM categories');
}

async function library() {
  return await query('SELECT * FROM articles WHERE lib = 1');
}

async function comment ({user, text, art_id}) {
  await query (`UPDATE articles SET popularity = popularity + 1 WHERE art_id = ?`, [art_id]);
  await query(`INSERT INTO comments (user, text, art_id) VALUES (?, ?, ?)`, [user, text, art_id]);
}

async function subscribe ({email}) {
  await query(`INSERT INTO emails (email) VALUES (?)`, [email]);
}

async function changes () {
  return await query(`SELECT *, DATE_FORMAT(date, '%d.%m.%Y') AS date2 FROM changes ORDER BY date DESC`);
}

async function randomArt () {
  return await query(`SELECT * FROM articles ORDER BY RAND() LIMIT 1`);
}

async function sendMail ({name, email, title, mail, page}) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'swenliw@gmail.com',
      pass: 'ldwjgybfawvccirg'
    }
  });
  try {
    await transporter.sendMail({
      from: 'swenliw@gmail.com',
      sender: email,
      to: 'swenliw@gmail.com',
      subject: title,
      html: require('../static/mail.js').mail("Новое письмо для тебя!", "<p>*Письмо направилено со страницы '" + page + "' в conspectus</p><h1 style='font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif; font-size: 2em; font-weight: 700; letter-spacing: 0.02em;'>" + title + "</h1><p><h3 style='font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif; font-size: 1.5em; font-weight: 700; letter-spacing: 0.02em;'>Name sender:</h3>" + name + "</p><p><h3 font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif; font-size: 1.5em; font-weight: 700; letter-spacing: 0.02em;>Email for answer:</h3>" + email + "</p><p><h3 font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif; font-size: 1.5em; font-weight: 700; letter-spacing: 0.02em;>Text:</h3><pre>" + mail + "</pre></p>"),
    });
  } catch (e) {
    return e.message;
  }
  return 'ok';
}

async function adminLogin ({name, password}) {
  if (process.env.NODE_ENV === 'development') return 'ok';
   else console.log('not dev');
  if (name === "Hankie5043" && password === "hy2HEe3Br2")
    return "ok"
  else return "error"
}

async function addcat({catLink, catName}) {
  let art = await query(`INSERT INTO categories (link, text) VALUES (?, ?)`, [
    catLink, catName ]);
  return 'ok'
}

async function addchanges({changesName, changesText}) {
 console.log('changes add' + changesName + changesText);
  let art = await query(`INSERT INTO changes (title, html) VALUES (?, ?)`, [
    changesName, changesText ]);

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'swenliw@gmail.com',
      pass: 'ldwjgybfawvccirg'
    }
  });

  let mails = await query(`SELECT * FROM emails`);
  for(let i = 0; i < mails.length; i++) {
    try {
      await transporter.sendMail({
        from: 'swenliw@gmail.com',
        sender: 'swenliw@gmail.com',
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

export {categories, library, comment, subscribe, sendMail, randomArt, changes, adminLogin, addcat, addchanges}
