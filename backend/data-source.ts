import { DataSource } from "typeorm";
import { Payment } from "./src/entities/Payment";
import { PaymentsJob } from "./src/entities/PaymentsJob";
import { CreatePayments1740000000000 } from "./src/migrations/1740000000000-CreatePayments";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Payment, PaymentsJob],
  migrations: [CreatePayments1740000000000],
  synchronize: false,
});
