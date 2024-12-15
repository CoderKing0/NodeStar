const KoaRouter = require("@koa/router");
const { verifyToken } = require("../middleware/login.middleware");
const {
  create,
  getLabelList,
  verifyLabelIsExist,
} = require("../controller/label.controller");

const labelRouter = new KoaRouter({ prefix: "/label" });

labelRouter.post("/", verifyToken, verifyLabelIsExist, create);
labelRouter.get('/', verifyToken, getLabelList)

module.exports = labelRouter;
