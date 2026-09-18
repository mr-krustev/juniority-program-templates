type SuccessResponse = {
  success: true;
  data: string;
};

type FailureResponse = {
  success: false;
  error: string;
};

type ApiResponse = SuccessResponse | FailureResponse;

// Returns randomly success or failure response
const getApiResponse = (): ApiResponse => {
  const exampleRespnses: ApiResponse[] = [
    { success: true, data: "Transaction completed successfully" },
    { success: false, error: "Not enough funds." },
  ];

  return exampleRespnses[Math.floor(Math.random() * exampleRespnses.length)];
};

export const runSlowExternalOperation = async (): Promise<ApiResponse> => {
  const betweenOneAndFiveSeconds = 1000 + Math.floor(Math.random() * 4000);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getApiResponse());
    }, betweenOneAndFiveSeconds);
  });
};
