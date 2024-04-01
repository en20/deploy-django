export interface Error {
  message: string;
}

export interface ResponseError {
  error: string;
}

export function isError(input: unknown): input is Error {
  if ((input as Error).message !== undefined) {
    return true
  }
  return false
}

export function isResponseError(input: unknown): input is ResponseError {
  if ((input as ResponseError).error !== undefined) {
    return true
  }
  return false
}
