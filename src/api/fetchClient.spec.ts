import { describe, expect, it, vi } from 'vitest'

import { fetchClient, type Request } from './fetchClient'

const mockFetch = vi.fn()

global.fetch = mockFetch

describe('fetchFactory', () => {
  it('should make a request with the correct URL and return a successful response', async () => {
    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue({ success: true }),
      status: 200,
    })

    const request: Request = {
      headers: {
        Authorization: 'Bearer token',
      },
      method: 'GET',
      path: '/test',
      query: 'id=123',
    }

    const response = await fetchClient(request)

    expect(mockFetch).toHaveBeenCalledWith(`/test?id=123`, {
      body: undefined,
      headers: {
        Authorization: 'Bearer token',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })

    expect(response).toEqual({
      body: { success: true },
      status: 200,
    })
  })

  it('should return an error response when fetch fails', async () => {
    mockFetch.mockRejectedValue(new Error('Network error'))

    const request: Request = {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      path: '/error',
      query: '',
    }

    try {
      await fetchClient(request)
    } catch (error) {
      expect((error as Error).message).toBe('Network error')
    }

    expect(mockFetch).toHaveBeenCalledWith(`/error`, {
      body: undefined,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
  })

  it('should return empty body when response body cannot be parsed as JSON', async () => {
    mockFetch.mockResolvedValue({
      json: vi.fn().mockRejectedValue(new Error('Invalid JSON')),
      status: 200,
    })

    const request: Request = {
      headers: {},
      method: 'GET',
      path: '/invalid-json',
      query: '',
    }

    const response = await fetchClient(request)

    expect(response).toEqual({
      body: {},
      status: 200,
    })
  })

  it('should include query parameters in the URL when present', async () => {
    mockFetch.mockResolvedValue({
      json: vi.fn().mockResolvedValue({ data: 'some-data' }),
      status: 200,
    })

    const request: Request = {
      headers: {},
      method: 'GET',
      path: '/data',
      query: 'filter=active',
    }

    const response = await fetchClient(request)

    expect(mockFetch).toHaveBeenCalledWith(`/data?filter=active`, {
      body: undefined,
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })

    expect(response).toEqual({
      body: { data: 'some-data' },
      status: 200,
    })
  })
})
