import type { GetUserAlbumsResponse200 } from '@/api/jsonplaceholder/getUserAlbums'
import type { IUserAlbum } from '@/views/UserDetail/types/IUserAlbum'

import { getUserAlbumsFactory } from '@/views/UserDetail/deps/getUserAlbumsFactory'
import { Err, Ok } from '@thames/monads'
import { describe, expect, it, vi } from 'vitest'

const userAlbumsResponse: GetUserAlbumsResponse200['body'] = [
  { id: 1, title: 'Album One', userId: 1 },
  { id: 2, title: 'Album Two', userId: 1 },
]

const formattedUserAlbums: IUserAlbum[] = [
  { id: 1, title: 'Album One' },
  { id: 2, title: 'Album Two' },
]

describe('getUserAlbumsFactory', () => {
  it('should return Ok with user list on successful request', async () => {
    const mockApiClient = vi.fn().mockResolvedValue({ body: userAlbumsResponse, status: 200 })
    const getUserAlbums = getUserAlbumsFactory(mockApiClient)

    const result = await getUserAlbums(1)

    expect(result).toEqual(Ok(formattedUserAlbums))
  })

  it('should return Err with "Server error" if status is not 200', async () => {
    const mockApiClient = vi.fn().mockResolvedValue({ body: {}, status: 500 })
    const getUserAlbums = getUserAlbumsFactory(mockApiClient)

    const result = await getUserAlbums(1)

    expect(result).toEqual(Err('Server error'))
  })

  it('should return Err with error message if an exception occurs', async () => {
    const mockApiClient = vi.fn().mockRejectedValue(new Error('Network error'))
    const getUserAlbums = getUserAlbumsFactory(mockApiClient)

    const result = await getUserAlbums(1)

    expect(result).toEqual(Err('Error: Network error'))
  })
})
