import type { GetUserRequest, GetUserResponse } from '@/api/jsonplaceholder/getUser'

export type GetUserApiClientDelegate = (req: GetUserRequest) => Promise<GetUserResponse>
