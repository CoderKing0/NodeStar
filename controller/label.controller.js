const { create, list, isLabelExist } = require("../service/label.service");

class LabelController {
  async create(ctx, next) {
    const { name } = ctx.request.body;
    const result = await create(name);

    ctx.body = {
      code: 200,
      message: "创建成功",
      data: result,
    };
  }
  async getLabelList(ctx, next) {
    const result = await list();
    ctx.body = {
      code: 200,
      message: "查询成功",
      data: result,
    };
  }
  async verifyLabelIsExist(ctx, next) {
    const { name } = ctx.request.body;

    const result = await isLabelExist(name);

    if (result) {
      return ctx.app.emit("error", -1201, ctx);
    }
    await next();
  }
}

module.exports = new LabelController();
