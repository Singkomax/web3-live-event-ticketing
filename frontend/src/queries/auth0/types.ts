import { UseQueryOptions } from "react-query";
import { auth0QueryKeys } from "./queries";
import { User } from "@auth0/auth0-react";

type User_Metadata = {
  address: string
}

export type UserProfile = User & {
  user_metadata?: User_Metadata
}

export type GetUserOptions<T> = Omit<
  UseQueryOptions<
    UserProfile,
    unknown,
    T,
    ReturnType<typeof auth0QueryKeys.getUser>
  >,
  'queryKey' | 'queryFn'
>

export type PatchUserPayload = { userId: string, userProfile: UserProfile }