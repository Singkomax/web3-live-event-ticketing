import { UserProfile } from "./types"

const auth0Domain = 'https://dev-arf03mfw5s0bw6fn.us.auth0.com'

export const getUser = async ({ userId, auth0ApiKey }: { userId: string, auth0ApiKey: string }) => {
  const res = await fetch(`${auth0Domain}/api/v2/users/${userId}`, {
    headers: new Headers({
      Authorization: `Bearer ${auth0ApiKey}`
    })
  })

  return await res.json() as UserProfile
}

export const updateUser = async ({ userId, userProfile, auth0ApiKey }: { userId: string, userProfile: UserProfile, auth0ApiKey: string }) => {
  const res = await fetch(`${auth0Domain}/api/v2/users/${userId}`, {
    method: 'PATCH',
    headers: new Headers({
      Authorization: `Bearer ${auth0ApiKey}`,
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(userProfile)
  })

  return await res.json()
}