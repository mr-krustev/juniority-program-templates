import type Router from "koa-router";
import { AppDataSource } from "../../data-source";
import { Payment } from "../entities/Payment";
import { PaymentsJob } from "../entities/PaymentsJob";

export const registerPaymentJobRoutes = (router: Router): void => {
  router.get("/payments/jobs", async (ctx) => {
    const jobs = await AppDataSource.getRepository(PaymentsJob).find();
    ctx.body = jobs;
  });

  router.get("/payments/jobs/:id", async (ctx) => {
    const jobId = ctx.params.id;
    const jobRepository = AppDataSource.getRepository(PaymentsJob);
    const job = await jobRepository.findOneBy({ id: jobId });

    if (!job) {
      ctx.status = 404;
      ctx.body = { error: "Payment job not found" };
      return;
    }

    const payments = await AppDataSource.getRepository(Payment).find({
      where: { job: { id: job.id } },
    });
    ctx.body = payments;
  });
};
