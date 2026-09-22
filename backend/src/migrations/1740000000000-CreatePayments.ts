import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePayments1740000000000 implements MigrationInterface {
  name = "CreatePayments1740000000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "payments_status_enum" AS ENUM ('pending', 'completed', 'failed')`,
    );
    await queryRunner.query(`
      CREATE TABLE "payment_jobs" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "started_at" TIMESTAMPTZ,
        "last_updated_at" TIMESTAMPTZ,
        "finished_at" TIMESTAMPTZ,
        CONSTRAINT "PK_payment_jobs" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "payments" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "user_id" uuid NOT NULL,
        "amount" numeric(12, 2) NOT NULL,
        "status" "payments_status_enum" NOT NULL,
        "error_message" text,
        "payment_request" jsonb NOT NULL,
        "payment_response" jsonb NOT NULL,
        "job_id" uuid NOT NULL,
        CONSTRAINT "PK_payments" PRIMARY KEY ("id"),
        CONSTRAINT "FK_payments_job_id" FOREIGN KEY ("job_id")
          REFERENCES "payment_jobs"("id") ON DELETE CASCADE
      )
    `);
    await queryRunner.query(
      `CREATE INDEX "IDX_payments_job_id" ON "payments" ("job_id")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_payments_user_id" ON "payments" ("user_id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payments"`);
    await queryRunner.query(`DROP TABLE "payment_jobs"`);
    await queryRunner.query(`DROP TYPE "payments_status_enum"`);
  }
}
