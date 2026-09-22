import { randomUUID } from "node:crypto";
import { AppDataSource } from "../../data-source";
import { Payment } from "../entities/Payment";
import { PaymentsJob } from "../entities/PaymentsJob";
import type { PaymentRequest, PaymentResponse } from "../types/payment-payloads";

const JOB_PAYMENT_COUNTS = [25, 125, 625, 3025, 15125] as const;
const BATCH_SIZE = 200;
const RECEIPT_TEXT = "R".repeat(16 * 1024);

const buildPaymentRequest = (
  requestId: string,
  paymentAmount: number,
): PaymentRequest => ({
  requestId,
  merchantId: "merchant-seed",
  transactionId: requestId,
  paymentAmount,
  receiptText: RECEIPT_TEXT,
});

const buildPaymentResponse = (requestId: string): PaymentResponse => ({
  requestId,
  paymentStatus: "completed",
});

export const seedPayments = async (): Promise<void> => {
  const jobCount = await AppDataSource.getRepository(PaymentsJob).count();
  if (jobCount > 0) {
    return;
  }

  const now = new Date();

  for (const paymentCount of JOB_PAYMENT_COUNTS) {
    const job = await AppDataSource.getRepository(PaymentsJob).save({
      startedAt: now,
      lastUpdatedAt: now,
      finishedAt: now,
    });

    for (let offset = 0; offset < paymentCount; offset += BATCH_SIZE) {
      const batchSize = Math.min(BATCH_SIZE, paymentCount - offset);
      const rows: Array<{
        userId: string;
        amount: number;
        status: "completed";
        errorMessage: null;
        paymentRequest: PaymentRequest;
        paymentResponse: PaymentResponse;
        job: { id: string };
      }> = [];

      for (let i = 0; i < batchSize; i++) {
        const requestId = randomUUID();
        const amount = offset + i + 1;
        rows.push({
          userId: randomUUID(),
          amount,
          status: "completed",
          errorMessage: null,
          paymentRequest: buildPaymentRequest(requestId, amount),
          paymentResponse: buildPaymentResponse(requestId),
          job: { id: job.id },
        });
      }

      await AppDataSource.createQueryBuilder()
        .insert()
        .into(Payment)
        .values(rows)
        .execute();
    }
  }
};

const isDirectRun = process.argv[1]?.includes("seed-payments");

if (isDirectRun) {
  AppDataSource.initialize()
    .then(async () => {
      await seedPayments();
      await AppDataSource.destroy();
    })
    .catch((error: unknown) => {
      console.error("Failed to seed payments", error);
      process.exit(1);
    });
}
