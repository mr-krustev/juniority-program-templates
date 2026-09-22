export type PaymentRequest = {
  requestId: string;
  merchantId: string;
  transactionId: string;
  paymentAmount: number;
  receiptText: string;
};

export type PaymentResponse = {
  requestId: string;
  paymentStatus: string;
  errorMessage?: string;
};

export const paymentStatuses = ["pending", "completed", "failed"] as const;

export type PaymentStatus = (typeof paymentStatuses)[number];
