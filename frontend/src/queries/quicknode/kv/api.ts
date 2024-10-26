import { KvSet } from "./types"

const quicknodeDomain = 'https://api.quicknode.com/kv'

export const retrieveSet = async (key: string) => {
  const res = await fetch(`${quicknodeDomain}/rest/v1/sets/${key}`, {
    headers: new Headers({
      'x-api-key': import.meta.env.VITE_QUICKNODE_API_KEY,
      'Content-Type': 'application/json'
    }),
    method: 'GET'
  })

  return await res.json() as KvSet
}