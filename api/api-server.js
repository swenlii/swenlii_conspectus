// Источник https://habr.com/ru/post/501652/

export default async (req, res, next) => {
  let url = req._parsedUrl.pathname.replace(/^\/+|\/+$|\.+/g, "");
  url = url.split("/");
  let method = url.pop();
  let controller = url.slice(1).join("/");

  let api = require('./' + controller);
  if (!api[method]) {
    console.error(`Not found method ${controller}.${method} in api folder`);
    return null;
  }
  
  try {
    let result = await api[method](req.params);
    res.end(JSON.stringify(result));
  }
  catch (e) {
    res.end(e.message);
  }
  
};
