const jwt = require("jsonwebtoken");
const md5 = require("../utils/md5");
const userService = require("../service/user.service");
const { PUBLIC_KEY } = require("../config/secure");

async function verifyLogin(ctx, next) {
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    return ctx.app.emit("error", -1001, ctx);
  }

  const users = await userService.findUserByName(name);
  const user = users[0];

  if (!user) {
    return ctx.app.emit("error", -1003, ctx);
  }

  if (md5(password) !== user.password) {
    return ctx.app.emit("error", -1004, ctx);
  }

  ctx.user = user;

  await next();
}

function verifyToken(ctx, next) {
  try {
    const authorization = ctx.headers.authorization;

    if (!authorization) {
      return ctx.app.emit("error", -1005, ctx);
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, PUBLIC_KEY);

    next()
  } catch (error) {
    return ctx.app.emit("error", -1006, ctx);
  }
}

module.exports = {
  verifyLogin,
  verifyToken
};
