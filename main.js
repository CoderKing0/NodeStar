const Koa = require("koa");
const KoaRouter = require("@koa/router");
const app = new Koa();
const userRouter = new KoaRouter({ prefix: "/users" });

userRouter.post("/", (ctx, next) => {
  ctx.body = "hello world";
});

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());

app.listen(8000, () => {
  console.log("服务器启动成功，端口号8000~~~");
});
