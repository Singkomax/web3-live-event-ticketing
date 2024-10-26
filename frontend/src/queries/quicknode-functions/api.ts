const quicknodeDomain = 'https://api.quicknode.com'

export const onLogin = async (userId: string) => {
  const res = await fetch(`${quicknodeDomain}/functions/rest/v1/functions/8c91d23f-2c3d-47a4-83cf-ee6e4f33346c/call?result_only=true`, {
    headers: new Headers({
      'x-api-key': import.meta.env.VITE_QUICKNODE_FUNCTION_API_KEY,
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify({
      "network": "ethereum-mainnet",
      "dataset": "block",
      "user_data": {
        "userId": userId,
        "auth0ManageApiKey": import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN
      }
    })
  })

  return await res.json()
}