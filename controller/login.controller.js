const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/secure");

class LoginController {
  sign(ctx, next) {
    const { id, name } = ctx.user;

    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });

    const result = { id, name, token };
    ctx.body = {
      code: 200,
      message: "用户登录成功",
      data: result,
    };
  }
  test(ctx, next) {
    ctx.body = { code: 200, message: "测试成功" };
  }
}

module.exports = new LoginController();
