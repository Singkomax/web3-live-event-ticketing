import { QNFuncResponse } from "./types"

export const resultFunctionSelector = <T>(res: QNFuncResponse<T>) => {
  return res.execution.result
}
