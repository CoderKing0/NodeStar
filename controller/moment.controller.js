const momentService = require("../service/moment.service.js");
const labelService = require("../service/label.service");

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

  async verifyMomentIsExist(ctx, next) {
    const momentId = ctx?.params?.momentId || ctx.request.body?.momentId;

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

  async addLabels(ctx, next) {
    const { momentId } = ctx.params;
    const { labels } = ctx.request.body;

    for (const label of labels) {
      const isExistLabel = await labelService.isLabelExist(label);

      // 用户为动态添加标签时，也可以自定义新标签，因此需要自动创建标签
      let labelId = -1;
      if (!isExistLabel) {
        const labelResult = await labelService.create(label);
        labelId = labelResult.insertId;
      } else {
        const labelResult = await labelService.getLabelByName(label);
        labelId = labelResult[0].id;
      }

      // 为动态添加标签
      // 判断标签是否已经和动态存在关联
      const isExistRef = await momentService.isExistRef(momentId, labelId);

      if (!isExistRef) {
        await momentService.addRef(momentId, labelId);
      }
    }

    ctx.body = {
      code: 200,
      message: "添加标签成功",
    };
  }
}

module.exports = new MomentController();
