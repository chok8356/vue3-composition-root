import type { GetUserRequest, GetUserResponse } from '@/api/jsonplaceholder/getUser'

export type GetUserApiClientDelegate = (request: GetUserRequest) => Promise<GetUserResponse>
