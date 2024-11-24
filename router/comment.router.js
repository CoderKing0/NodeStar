const KoaRouter = require("@koa/router");
const { create, reply } = require("../controller/comment.controller");
const { verifyToken } = require("../middleware/login.middleware");
const { verifyMomentIsExist } = require("../controller/moment.controller");

const commentRouter = new KoaRouter({ prefix: "/comment" });

commentRouter.post("/", verifyToken, verifyMomentIsExist, create);
commentRouter.post("/reply", verifyToken, verifyMomentIsExist, reply)

module.exports = commentRouter;
