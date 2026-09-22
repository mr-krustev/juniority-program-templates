import type { ValueTransformer } from "typeorm";

export const numericTransformer = {
  to(value: number): number {
    return value;
  },
  from(value: string | number | null): number {
    if (typeof value === "number") {
      return value;
    }
    if (value === null) {
      return Number.NaN;
    }
    return Number(value);
  },
} satisfies ValueTransformer;
