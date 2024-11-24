const KoaRouter = require("@koa/router");
const { verifyToken } = require("../middleware/login.middleware");
const {
  create,
  list,
  detail,
  verifyMomentIsExist,
  remove,
  update,
} = require("../controller/moment.controller");
const { verifyPermission } = require("../middleware/permission.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });

momentRouter.post("/", verifyToken, create);
momentRouter.get("/", list);
momentRouter.get("/:momentId", detail);
// 删除和修改操作需要用户登录，并且只能自己操作自己发布的动态
momentRouter.delete(
  "/:momentId",
  verifyToken,
  verifyMomentIsExist,
  verifyPermission,
  remove
);
momentRouter.patch(
  "/:momentId",
  verifyToken,
  verifyMomentIsExist,
  verifyPermission,
  update
);

module.exports = momentRouter;
