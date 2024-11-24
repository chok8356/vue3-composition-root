import type { GetAlbumPhotosResponse200 } from '@/api/jsonplaceholder/getAlbumPhotos'
import type { IAlbumPhoto } from '@/views/UserDetail/components/UserDetailAlbumPhotos/types/IAlbumPhoto'

import { getAlbumPhotosFactory } from '@/views/UserDetail/components/UserDetailAlbumPhotos/deps/getAlbumPhotosFactory'
import { Err, Ok } from '@thames/monads'
import { describe, expect, it, vi } from 'vitest'

const albumsPhotosResponse: GetAlbumPhotosResponse200['body'] = [
  {
    albumId: 1,
    id: 1,
    thumbnailUrl: 'http://example.com/thumbnail1.jpg',
    title: 'Photo 1',
    url: 'http://example.com/photo1.jpg',
  },
  {
    albumId: 1,
    id: 2,
    thumbnailUrl: 'http://example.com/thumbnail2.jpg',
    title: 'Photo 2',
    url: 'http://example.com/photo2.jpg',
  },
]

const formattedAlbumPhotos: IAlbumPhoto[] = [
  {
    id: 1,
    thumbnailUrl: 'http://example.com/thumbnail1.jpg',
    title: 'Photo 1',
    url: 'http://example.com/photo1.jpg',
  },
  {
    id: 2,
    thumbnailUrl: 'http://example.com/thumbnail2.jpg',
    title: 'Photo 2',
    url: 'http://example.com/photo2.jpg',
  },
]

describe('getAlbumPhotosFactory', () => {
  it('should return Ok with user list on successful request', async () => {
    const mockApiClient = vi.fn().mockResolvedValue({ body: albumsPhotosResponse, status: 200 })
    const getAlbumPhotos = getAlbumPhotosFactory(mockApiClient)

    const result = await getAlbumPhotos(1, 1)

    expect(result).toEqual(Ok(formattedAlbumPhotos))
  })

  it('should return Err with "Server error" if status is not 200', async () => {
    const mockApiClient = vi.fn().mockResolvedValue({ body: {}, status: 500 })
    const getAlbumPhotos = getAlbumPhotosFactory(mockApiClient)

    const result = await getAlbumPhotos(1, 1)

    expect(result).toEqual(Err('Server error'))
  })

  it('should return Err with error message if an exception occurs', async () => {
    const mockApiClient = vi.fn().mockRejectedValue(new Error('Network error'))
    const getAlbumPhotos = getAlbumPhotosFactory(mockApiClient)

    const result = await getAlbumPhotos(1, 1)

    expect(result).toEqual(Err('Error: Network error'))
  })
})
