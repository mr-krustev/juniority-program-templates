import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Payment } from "./Payment";

@Entity({ name: "payment_jobs" })
export class PaymentsJob {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "started_at", type: "timestamptz", nullable: true })
  startedAt!: Date | null;

  @Column({ name: "last_updated_at", type: "timestamptz", nullable: true })
  lastUpdatedAt!: Date | null;

  @Column({ name: "finished_at", type: "timestamptz", nullable: true })
  finishedAt!: Date | null;

  @OneToMany(() => Payment, (payment) => payment.job)
  payments!: Payment[];
}
