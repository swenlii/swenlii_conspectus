// Источник https://habr.com/ru/post/501688/

export default (context, inject) => {
  inject("api", async (controller, method, params) => {
    try {
      let api = require("../api/" + controller.replace(/^\/+|\/+$|\.+/g, ""));
      if (!api[method]) {
        console.error(`Not found method ${controller}.${method} in api folder`);
        return null;
      }
      return await api[method](params);
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
};
