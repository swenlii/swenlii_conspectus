let mail = (header, htmltext, img = '') => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <title>${header}</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
       
    <style>@font-face {
  font-family: 'EB Garamond'; font-style: italic; font-weight: 400; font-display: swap; src: url('https://fonts.gstatic.com/s/ebgaramond/v25/SlGFmQSNjdsmc35JDF1K5GRwUjcdlttVFm-rI7e8QI96.ttf') format('truetype');
  }
  @font-face {
  font-family: 'Oswald'; font-style: normal; font-weight: 500; font-display: swap; src: url('https://fonts.gstatic.com/s/oswald/v48/TK3_WkUHHAIjg75cFRf3bXL8LICs18NvgUE.ttf') format('truetype');
  }
  @font-face {
  font-family: 'PT Mono'; font-style: normal; font-weight: 400; font-display: swap; src: url('https://fonts.gstatic.com/s/ptmono/v13/9oRONYoBnWILk-9ArCg.ttf') format('truetype');
  }
  </style>
  </head>
    <body>
      <main style="display: flex; justify-content: center; align-items: center; padding: 2em;">
        <div style="font-family: 'pt mono' , 'roboto mono', 'verdana' , monospace; box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.9); font-weight: 400; letter-spacing: 0.03em; max-width: 450px; background-color: #c1c1c1; color: #1f1f1f; padding: 2.5em;">
          <div style="margin: 1.3em 0 1.8em;">
            <a href="#" style="display: block; font-family: 'EB Garamond', 'Georgia', 'Times New Roman', serif; font-size: 1.5em; color: #1f1f1f; text-decoration: none;">
              <img src="https://d29fhpw069ctt2.cloudfront.net/icon/image/39127/preview.png" style="display: block; width: 30px; max-width: 30px; margin: auto;">
            </a>
            <a href="#" style="display: block; font-family: 'EB Garamond', serif; font-size: 1.5em; color: #1f1f1f; text-decoration: none; text-align: center;">Conspectus</a>
          </div>
          <img src="${img === '' ? 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1170&amp;q=80' : img}" style="width: 380px; max-width: 380px; display: block; filter: grayscale(100%); margin: 0.7em auto;">
          <h2 style="font-family: 'Oswald', 'Impact', 'Arial Black', sans-serif; font-size: 2em; font-weight: 700; letter-spacing: 0.02em;" align="center">${header}</h2>
          <div style="" align="center">
            ${htmltext}
            <p style="font-style: italic; font-family: 'EB Garamond', 'Georgia', 'Times New Roman', serif; font-size: 1.3em;">С уважением, swenlii</p>
          </div>
          <a href="conspectus.com" style="background-color: #1f1f1f; color: #fdfdfd; box-shadow: -2px 2px 0 #c1c1c1, -5px 5px 0 #1f1f1f; display: block; width: max-content; text-decoration: none; text-align: center; transition: 0.3s all ease; margin: 1em auto; padding: 0.7em 1em;">Читать</a>
          <div style="margin: 1.7em auto 0 auto; font-size: 10px; color: #999999; width: 80%;" align="center">
            <a href="conspectus.com" style="font-size: 10px; color: #999999; transition: 0.3s all ease;">Отписаться</a>
          </div>
        
        </div>
      </main>
    </body>
  </html>`;}; export {mail}