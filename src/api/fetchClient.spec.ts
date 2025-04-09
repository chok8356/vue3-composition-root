import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { FetchResponse, Request } from './fetchClient'

import { fetchClient } from './fetchClient'

const mockFetch = vi.fn()
globalThis.fetch = mockFetch

describe('fetchClient', () => {
  beforeEach(() => {
    vi.clearAllMocks() // или mockFetch.mockClear()
  })

  it('should make a GET request with the correct URL, headers and return a successful response', async () => {
    interface SuccessResponse { success: boolean }
    const mockJsonResponse: SuccessResponse = { success: true }
    const mockStatus = 200

    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockJsonResponse),
      ok: true,
      status: mockStatus,
    })

    const request: Request = {
      headers: {
        Authorization: 'Bearer token',
      },
      method: 'GET',
      path: '/test',
      query: 'id=123',
    }

    const response: FetchResponse<SuccessResponse> = await fetchClient<SuccessResponse>(request)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith('/test?id=123', {
      body: undefined,
      headers: {
        'Authorization': 'Bearer token',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })

    expect(response).toEqual({
      body: mockJsonResponse,
      status: mockStatus,
    })
  })

  it('should make a POST request with a body and return a successful response', async () => {
    interface PostData { data: string }
    interface PostResponse { id: number, message: string }

    const requestBody: PostData = { data: 'test data' }
    const mockJsonResponse: PostResponse = { id: 1, message: 'Created' }
    const mockStatus = 201

    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockJsonResponse),
      ok: true,
      status: mockStatus,
    })

    const request: Request = {
      body: requestBody,
      headers: { 'X-Custom': 'value' },
      method: 'POST',
      path: '/create',
    }

    const response = await fetchClient<PostResponse>(request)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith('/create', {
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'X-Custom': 'value',
      },
      method: 'POST',
    })

    expect(response).toEqual({
      body: mockJsonResponse,
      status: mockStatus,
    })
  })

  it('should throw an error when fetch itself fails (network error)', async () => {
    const networkError = new Error('Network error')
    mockFetch.mockRejectedValue(networkError)

    const request: Request = {
      method: 'POST',
      path: '/error',
    }

    await expect(fetchClient(request)).rejects.toThrow(networkError)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith('/error', {
      body: undefined,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  })

  it('should throw an error when response body cannot be parsed as JSON', async () => {
    const jsonParseError = new Error('Invalid JSON')
    const mockStatus = 200

    mockFetch.mockResolvedValue({
      json: vi.fn().mockRejectedValue(jsonParseError),
      ok: true,
      status: mockStatus,
    })

    const request: Request = {
      method: 'GET',
      path: '/invalid-json',
    }

    await expect(fetchClient(request)).rejects.toThrow(
      `Failed to parse JSON for request to /invalid-json: ${jsonParseError}`,
    )

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith('/invalid-json', {
      body: undefined,
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    })
  })

  it('should include query parameters in the URL when present', async () => {
    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue({ data: 'some-data' }),
      ok: true,
      status: 200,
    })

    const request: Request = {
      method: 'GET',
      path: '/data',
      query: 'filter=active&sort=asc',
    }

    await fetchClient(request)

    expect(mockFetch).toHaveBeenCalledTimes(1)
    expect(mockFetch).toHaveBeenCalledWith('/data?filter=active&sort=asc', {
      body: undefined,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
  })
})
