export interface BagistoErrorLike {
  status: number;
  message: Error;
  cause?: Error;
}

export const isObject = (object: unknown): object is Record<string, unknown> => {
  return typeof object === 'object' && object !== null && !Array.isArray(object);
};

export const isArray = (arr: any) => {
  return arr && Array.isArray(arr) && arr.length > 0;
};

export const isBagistoError = (error: unknown): error is BagistoErrorLike => {
  if (!isObject(error)) return false;

  if (error instanceof Error) return true;

  return findError(error);
};

function findError<T extends object>(error: T): boolean {
  if (Object.prototype.toString.call(error) === '[object Error]') {
    return true;
  }

  const prototype = Object.getPrototypeOf(error) as T | null;

  return prototype === null ? false : findError(prototype);
}
