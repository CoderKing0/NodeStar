const userService = require("../service/user.service");
const md5 = require("../utils/md5");

async function verifyUser(ctx, next) {
  const { name, password } = ctx.request.body;

  if (!name || !password) {
    return ctx.app.emit("error", -1001, ctx);
  }

  const user = await userService.findUserByName(name);
  if (user.length > 0) {
    return ctx.app.emit("error", -1002, ctx);
  }

  await next();
}

async function handlePassword(ctx, next) {
  const { password } = ctx.request.body;

  ctx.request.body.password = md5(password);
  await next();
}

module.exports = {
  verifyUser,
  handlePassword,
};
