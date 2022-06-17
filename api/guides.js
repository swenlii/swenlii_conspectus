const {query} = require("./db-connect");
let nodemailer = require('nodemailer');

async function index() {
  let ret = await query('SELECT * FROM guides');
  for(let i = 0; i < ret.length; i++) {
    ret[i].arts = await query('SELECT * FROM articles_for_guides WHERE guide_id = $1', [ret[i].guide_id]);
  }
  return ret;
}

async function get({id}) {
  let ret = await query('SELECT * FROM guides where guide_id = $1', [id]);
  if (ret.length === 0) return null;
  ret[0].arts = await query('SELECT * FROM articles_for_guides WHERE guide_id = $1', [id]);
  return ret[0];
}

async function add({guideId, guideTitle, guideDesc, guideInfo, guideType, guideKey, guideArts}){
  let guide = await query(`INSERT INTO guides (guide_id, title, type, description, info, keywords) VALUES ($1, $2, $3, $4, $5, $6)`, [
    guideId, guideTitle, guideType, guideDesc, guideInfo, guideKey ]);

  for (let i = 0; i < guideArts.length; i++) {
    let art = await query(`INSERT INTO articles_for_guides (guide_id, title, description, art_id, step) VALUES ($1, $2, $3, $4, $5)`, [
      guideId, guideArts[i].titleForGuide, guideArts[i].descForGuide, guideArts[i].art_id, guideArts[i].step ]);
  };

  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  let mails = await query(`SELECT * FROM emails`);
  for(let i = 0; i < mails.length; i++) {
    try {
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        sender: process.env.MAIL_USER,
        to: mails[i].email,
        subject: guideTitle,
        html: require('../static/mail.js').mail("Новое руководство!", "<p>На сайте Conspectus новое руководство!</p> <h4 style=\"font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif; font-size: 1.5em; font-weight: 700; letter-spacing: 0.02em;\">" + guideTitle + "</h4> <p>" + guideDesc + "</p> <p>В руководстве уже " + guideArts.length + " статьи</p>"),
      });
    } catch (e) {
      return e.message;
    }
  }

  return 'ok'
}

async function edit({guideId, guideTitle, guideDesc, guideInfo, guideType, guideKey, guideArts, delArts}){

  let guide = await query("UPDATE guides SET title=$1, type=$2, description=$3, info=$4, keywords=$5 WHERE guide_id=$6", [
    guideTitle, guideType, guideDesc, guideInfo, guideKey, guideId ]);

  for (let i = 0; i < guideArts.length; i++) {
    console.log(guideId + ' ' + guideArts[i].id);
    let arts = await query(`SELECT * FROM articles_for_guides WHERE guide_id=$1 AND art_id=$2`, [guideId, guideArts[i].id]);
    if (arts.length === 0) {
      let art = await query(`INSERT INTO articles_for_guides (guide_id, title, description, art_id, step) VALUES ($1, $2, $3, $4, $5)`, [
      guideId, guideArts[i].titleForGuide, guideArts[i].descForGuide, guideArts[i].art_id, guideArts[i].step ]);
    }
  };

  if (delArts !== null && delArts.length > 0) {
    for (let i = 0; i < delArts.length; i++) {
      let res = await query(`DELETE FROM articles_for_guides WHERE id=$1`, [delArts[i]])
    }
  }
  
  return 'ok'
}

async function handbook() {
  return await query(`SELECT * FROM handbooks`);
}

export {index, get, handbook, add, edit}
