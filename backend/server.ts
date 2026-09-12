import Koa from "koa";
import bodyParser from "koa-body";
import Router from "koa-router";
import { AppDataSource } from "./data-source";

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get("/", (ctx) => {
  console.log("GET /");

  ctx.body = "Hello World";
});

app.use(router.routes());
app.use(router.allowedMethods());

const start = async () => {
  await AppDataSource.initialize();
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
