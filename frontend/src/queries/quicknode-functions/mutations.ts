import { useMutation, useQueryClient } from "react-query"
import { onLogin } from "./api"
import { auth0QueryKeys } from "../auth0"

export const useOnLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (userId: string) => {
      return await onLogin(userId)
    },
    onSettled: async (_1, _2, userId: string) => {
      queryClient.invalidateQueries({ queryKey: auth0QueryKeys.getUser(userId) })
    }
  })
}