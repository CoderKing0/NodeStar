const CommentService = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const { content, momentId } = ctx.request.body;
    const { id } = ctx.user;
    const result = await CommentService.create(content, momentId, id);

    ctx.body = {
      code: 100,
      message: "评论成功",
      data: result,
    };
  }

  async reply(ctx, next) {
    const { content, momentId, commentId } = ctx.request.body;
    const { id } = ctx.user;
    const result = await CommentService.reply(content, momentId, id, commentId);

    ctx.body = {
      code: 100,
      message: "回复评论成功",
      data: result,
    };
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;
    const delResult = await CommentService.remove(commentId);
    ctx.body = {
      code: 100,
      message: "删除评论成功",
      data: delResult,
    };
  }
}

module.exports = new CommentController();
