import "reflect-metadata";
import Koa from "koa";
import bodyParser from "koa-body";
import Router from "koa-router";
import { AppDataSource } from "./data-source";
import { registerHealthRoutes } from "./src/routes/health";
import { registerPaymentJobRoutes } from "./src/routes/payment-jobs";
import { seedPayments } from "./src/seeds/seed-payments";

const app = new Koa();
const router = new Router();

app.use(bodyParser());

registerHealthRoutes(router);
registerPaymentJobRoutes(router);

app.use(router.routes());
app.use(router.allowedMethods());

const start = async () => {
  await AppDataSource.initialize();
  await AppDataSource.runMigrations();
  await seedPayments();
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
};

start().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
