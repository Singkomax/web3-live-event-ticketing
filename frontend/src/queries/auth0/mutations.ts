import { useMutation, useQueryClient } from "react-query"
import { auth0QueryKeys } from "./queries"
import { updateUser } from "./api"
import { PatchUserPayload } from "./types"

export const usePatchUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, userProfile }: PatchUserPayload) => {
      return await updateUser({ userId, userProfile })
    },
    onSettled: async (_1, _2, { userId }: PatchUserPayload) => {
      queryClient.invalidateQueries({ queryKey: auth0QueryKeys.getUser(userId) })
    }
  })
}