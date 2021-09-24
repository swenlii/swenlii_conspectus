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
  return await query(`SELECT *, DATE_FORMAT(date, '%d.%m.%Y') AS date2 FROM changes`);
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
      html: "<p>*Письмо направилено со страницы '" + page + "' в conspectus</p><h1 style='color: #f80b0b'>" + title + "</h1><p><h3 style='color: #3f6efd'>Name sender:</h3>" + name + "</p><p><h3 style='color: #743ffd'>Email for answer:</h3>" + email + "</p><p><h3 style='color: #0bf889'>Text:</h3><pre>" + mail + "</pre></p>",
    });
  } catch (e) {
    return e.message;
  }
  return 'ok';
}

export {categories, library, comment, subscribe, sendMail, randomArt, changes}
