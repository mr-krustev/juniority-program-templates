import { runSlowExternalOperation } from "../external-api";

export const processPayment = async () => {
  const response = await runSlowExternalOperation();

  if (!response.success) {
    console.error(response.error);
  }

  return response;
};

export const batchProcessPayments = async () => {
  // TODO:
};
