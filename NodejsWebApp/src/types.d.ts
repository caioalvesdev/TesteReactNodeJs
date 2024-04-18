
export interface IOperations {
  calculate: (value1: number, value2: number, operation: (value1: number, value2: number) => number) => number,
  sum: (value1: number, value2: number) => number,
  sub: (value1: number, value2: number) => number,
  divide: (value1: number, value2: number) => number,
  multiple: (value1: number, value2: number) => number
}

export type OperationKey = "sum" | "sub" | "divide" | "multiple";