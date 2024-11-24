const servicePermission = require("../service/permission.service");

async function verifyPermission(ctx, next) {
  const { id } = ctx.user;
  const keyName = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[keyName];
  const resourceName = keyName.replace("Id", "");
  const isPermission = await servicePermission.checkPermission(
    id,
    resourceId,
    resourceName
  );
  if (isPermission) {
    await next();
  } else {
    ctx.app.emit("error", -2001, ctx);
  }
}

module.exports = {
  verifyPermission,
};
