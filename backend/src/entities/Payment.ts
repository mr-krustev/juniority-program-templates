import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import {
  paymentStatuses,
  type PaymentRequest,
  type PaymentResponse,
  type PaymentStatus,
} from "../types/payment-payloads";
import { numericTransformer } from "./numeric-transformer";
import { PaymentsJob } from "./PaymentsJob";

@Entity({ name: "payments" })
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Index()
  @Column({ name: "user_id", type: "uuid" })
  userId!: string;

  @Column({
    type: "numeric",
    precision: 12,
    scale: 2,
    transformer: numericTransformer,
  })
  amount!: number;

  @Column({
    type: "enum",
    enum: paymentStatuses,
    enumName: "payments_status_enum",
  })
  status!: PaymentStatus;

  @Column({ name: "error_message", type: "text", nullable: true })
  errorMessage!: string | null;

  @Column({ name: "payment_request", type: "jsonb" })
  paymentRequest!: PaymentRequest;

  @Column({ name: "payment_response", type: "jsonb" })
  paymentResponse!: PaymentResponse;

  @Index()
  @ManyToOne(() => PaymentsJob, (job) => job.payments, { onDelete: "CASCADE" })
  @JoinColumn({ name: "job_id" })
  job!: PaymentsJob;
}
