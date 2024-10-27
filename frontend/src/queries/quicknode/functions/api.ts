import DummyAllEvents from './getAllEvents.json'
import { AllEventsQnFuncResponse } from './types'

const quicknodeDomain = 'https://api.quicknode.com/functions'

export const onLogin = async (userId: string) => {
  const res = await fetch(`${quicknodeDomain}/rest/v1/functions/8c91d23f-2c3d-47a4-83cf-ee6e4f33346c/call?result_only=true`, {
    headers: new Headers({
      'x-api-key': import.meta.env.VITE_QUICKNODE_API_KEY,
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify({
      "network": "ethereum-mainnet",
      "dataset": "block",
      "user_data": {
        "userId": userId
      }
    })
  })

  return await res.json()
}

export const getAllEvents = async (filter?: string) => {
  console.log(filter)
  return DummyAllEvents as AllEventsQnFuncResponse
}