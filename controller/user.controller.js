const userService = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;

    const result = await userService.create(user);

    ctx.body = {
      code: 100,
      message: "用户注册成功",
      data: result,
    };
  }
}

module.exports = new UserController();
