const fs = require("fs");

function registryRoutes(app) {
  const files = fs.readdirSync("./router");

  for (const file of files) {
    if (!file.endsWith(".router.js")) continue;

    const router = require(`./${file}`);

    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}

module.exports = registryRoutes;
