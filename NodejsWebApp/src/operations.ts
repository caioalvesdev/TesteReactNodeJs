import { IOperations } from './types';

export const operations: IOperations = {
  calculate: (value1, value2, operation) => operation(value1, value2),
  sum: (value1, value2) => value1 + value2,
  sub: (value1, value2) => value1 - value2,
  divide: (value1, value2) => value1 / value2,
  multiple: (value1, value2) => value1 * value2
};
