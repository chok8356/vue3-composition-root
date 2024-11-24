import type { GetUsersResponse } from '@/api/jsonplaceholder/getUsers'

export type GetUsersApiClientDelegate = () => Promise<GetUsersResponse>
