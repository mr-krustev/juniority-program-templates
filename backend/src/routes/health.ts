import type Router from "koa-router";
import { AppDataSource } from "../../data-source";

export const registerHealthRoutes = (router: Router): void => {
  router.get("/health", async (ctx) => {
    try {
      await AppDataSource.query("SELECT 1");
      ctx.status = 200;
      ctx.body = { status: "ok" };
    } catch {
      ctx.status = 503;
      ctx.body = { status: "error" };
    }
  });
};
