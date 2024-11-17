const KoaRouter = require("@koa/router");
const { sign, test } = require("../controller/login.controller");
const { verifyLogin, verifyToken } = require("../middleware/login.middleware");

const loginRouter = new KoaRouter({ prefix: "/" });

loginRouter.post("login", verifyLogin, sign);

// 登录之后校验token
loginRouter.get("login/test", verifyToken, test);

module.exports = loginRouter;
