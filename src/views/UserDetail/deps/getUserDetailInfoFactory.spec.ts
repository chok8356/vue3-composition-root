import type { GetUserResponse200 } from '@/api/jsonplaceholder/getUser'
import type { IUserDetailInfo } from '@/views/UserDetail/types/IUserDetailInfo'

import { getUserDetailInfoFactory } from '@/views/UserDetail/deps/getUserDetailInfoFactory'
import { Err, Ok } from '@thames/monads'
import { describe, expect, it, vi } from 'vitest'

const userResponseOkBody: GetUserResponse200['body'] = {
  address: {
    city: 'Springfield',
    geo: {
      lat: '0.0000',
      lng: '0.0000',
    },
    street: '123 Main St',
    suite: 'Apt. 4',
    zipcode: '12345',
  },
  company: {
    bs: 'business solutions',
    catchPhrase: 'Innovation at its best',
    name: 'Doe Enterprises',
  },
  email: 'johndoe@example.com',
  id: 1,
  name: 'John Doe',
  phone: '555-1234',
  username: 'johndoe',
  website: 'johndoe.com',
}

const formattedUser: IUserDetailInfo = {
  email: 'johndoe@example.com',
  id: 1,
  name: 'John Doe',
  phone: '555-1234',
}

describe('getUserDetailInfoFactory', () => {
  it('should return Ok with user list on successful request', async () => {
    const mockApiClient = vi.fn().mockResolvedValue({ body: userResponseOkBody, status: 200 })
    const getUser = getUserDetailInfoFactory(mockApiClient)

    const result = await getUser(1)

    expect(result).toEqual(Ok(formattedUser))
  })

  it('should return Err with "Server error" if status is not 200', async () => {
    const mockApiClient = vi.fn().mockResolvedValue({ body: {}, status: 500 })
    const getUser = getUserDetailInfoFactory(mockApiClient)

    const result = await getUser(1)

    expect(result).toEqual(Err('Server error'))
  })

  it('should return Err with error message if an exception occurs', async () => {
    const mockApiClient = vi.fn().mockRejectedValue(new Error('Network error'))
    const getUser = getUserDetailInfoFactory(mockApiClient)

    const result = await getUser(1)

    expect(result).toEqual(Err('Error: Network error'))
  })
})
