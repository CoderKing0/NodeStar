const momentService = require("../service/moment.service.js");

class MomentController {
  async create(ctx, next) {
    const { content } = ctx.request.body;
    const { id } = ctx.user;

    const result = await momentService.create(content, id);

    ctx.body = {
      code: 100,
      message: "发表动态成功",
      data: result,
    };
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query;

    const result = await momentService.list(offset, size);
    ctx.body = {
      code: 100,
      message: "获取动态列表成功",
      data: result,
    };
  }

  async detail(ctx, next) {
    const { momentId } = ctx.params;

    const result = await momentService.getDetailById(momentId);
    ctx.body = {
      code: 100,
      message: "获取动态详情成功",
      data: result[0],
    };
  }

  async verifyIsExist(ctx, next) {
    const { momentId } = ctx.params;
    const detailResult = await momentService.getDetailById(momentId);
    if (detailResult.length < 1) {
      return ctx.app.emit("error", -1101, ctx);
    }
    await next();
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params;

    const delResult = await momentService.removeById(momentId);
    ctx.body = {
      code: 100,
      message: "删除动态成功",
      data: delResult,
    };
  }

  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    const result = await momentService.updateById(momentId, content);
    ctx.body = {
      code: 100,
      message: "修改动态成功",
      data: result,
    };
  }
}

module.exports = new MomentController();
