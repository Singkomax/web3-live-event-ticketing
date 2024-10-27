import { KvSet } from "./types";

export const valueKvSetSelector = (kvSet: KvSet) => {
  return kvSet.data.value
}