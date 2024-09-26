export interface NetworkError {
  message: string;
  code: string;
}

export interface CentraNetworkError {
  response: {
    data: {
      errors: { [key: string]: string };
    };
  };
  message: string;
  code: string;
}
