const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const registryRoutes = require("../router");

const app = new Koa();

app.use(bodyParser());
registryRoutes(app);

module.exports = app;
