export type FetchClient = <TResponse>(request: Request) => Promise<FetchResponse<TResponse>>

export interface FetchResponse<TResponse = any> {
  body: TResponse
  status: number
}

export interface Request {
  body?: any
  headers?: Record<string, string>
  method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'
  path: string
  query?: string
}

export const fetchClient: FetchClient = async <TResponse>(
  request: Request,
): Promise<FetchResponse<TResponse>> => {
  const { path, query } = request
  const url = query ? `${path}?${query}` : path

  const response = await fetch(url, {
    body: request.body ? JSON.stringify(request.body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...request.headers,
    },
    method: request.method,
  })

  let responseBody: TResponse

  try {
    responseBody = await response.json() as TResponse
  }
  catch (error) {
    console.error('Failed to parse JSON response:', error)
    throw new Error(`Failed to parse JSON for request to ${url}: ${error}`)
  }

  return {
    body: responseBody,
    status: response.status,
  }
}
