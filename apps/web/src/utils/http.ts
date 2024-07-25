export interface HttpError extends Error {
  status: number
}

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof Error && 'status' in error
}
