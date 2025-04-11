class ResponseApiError extends Error {
  status: number;
  validationErrors?: { field: string; message: string }[];
  constructor(
    status: number,
    message: string,
    validationErrors?: { field: string; message: string }[]
  ) {
    super(message);
    this.status = status;
    this.validationErrors = validationErrors;
  }
}

export default ResponseApiError;

export function isResponseApiError(error: unknown): error is ResponseApiError {
  return error instanceof ResponseApiError;
}
