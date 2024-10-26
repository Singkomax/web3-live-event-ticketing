import { UserProfile } from "./types"

const auth0Domain = 'https://dev-arf03mfw5s0bw6fn.us.auth0.com'

export const getUser = async ({ userId }: { userId: string}) => {
  const res = await fetch(`${auth0Domain}/api/v2/users/${userId}`, {
    headers: new Headers({
      Authorization: `Bearer ${import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN}`
    })
  })

  return await res.json() as UserProfile
}

export const updateUser = async ({ userId, userProfile }: { userId: string, userProfile: UserProfile }) => {
  const res = await fetch(`${auth0Domain}/api/v2/users/${userId}`, {
    method: 'PATCH',
    headers: new Headers({
      Authorization: `Bearer ${import.meta.env.VITE_AUTH0_MANAGEMENT_API_TOKEN}`,
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(userProfile)
  })

  return await res.json()
}