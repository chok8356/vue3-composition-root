import type { GetUsersResponse200 } from '@/api/jsonplaceholder/getUsers'
import type { IUser } from '@/views/UsersList/types/IUser'

import { getUsersFactory } from '@/views/UsersList/deps/getUsersFactory'
import { Err, Ok } from '@thames/monads'
import { describe, expect, it, vi } from 'vitest'

const usersResponseOkBody: GetUsersResponse200['body'] = [
  {
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
  },
]

const formattedUsers: IUser[] = [
  {
    id: 1,
    name: 'John Doe',
  },
]

describe('getUsersFactory', () => {
  it('should return Ok with user list on successful request', async () => {
    const mockApiClient = vi.fn().mockResolvedValue({ body: usersResponseOkBody, status: 200 })
    const getUsers = getUsersFactory(mockApiClient)

    const result = await getUsers()

    expect(result).toEqual(Ok(formattedUsers))
  })

  it('should return Err with "Server error" if status is not 200', async () => {
    const mockApiClient = vi.fn().mockResolvedValue({ body: {}, status: 500 })
    const getUsers = getUsersFactory(mockApiClient)

    const result = await getUsers()

    expect(result).toEqual(Err('Server error'))
  })

  it('should return Err with error message if an exception occurs', async () => {
    const mockApiClient = vi.fn().mockRejectedValue(new Error('Network error'))
    const getUsers = getUsersFactory(mockApiClient)

    const result = await getUsers()

    expect(result).toEqual(Err('Error: Network error'))
  })
})
