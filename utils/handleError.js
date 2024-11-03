const app = require("../app");
const errorMap = require("../config/errorMap");

app.on("error", (errorCode, ctx) => {
  ctx.body = errorMap[errorCode];
});
