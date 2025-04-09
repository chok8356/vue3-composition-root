export type FetchClient = <TResponse>(request: Request) => Promise<FetchResponse<TResponse>>

export type FetchResponse<TResponse = any> = {
  body: TResponse
  status: number
}

export type Request = {
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

  const responseBody: TResponse = await response.json().catch(() => ({}) as TResponse)

  return {
    body: responseBody,
    status: response.status,
  }
}
