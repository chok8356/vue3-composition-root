export type Request = {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  body?: any
  headers?: Record<string, string>
  method: 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'
  path: string
  query?: string
}

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type FetchResponse<TResponse = any> = {
  body: TResponse
  status: number
}

export type FetchClient = <TResponse>(req: Request) => Promise<FetchResponse<TResponse>>

export const fetchClient: FetchClient = async <TResponse>(
  req: Request,
): Promise<FetchResponse<TResponse>> => {
  const { path, query } = req
  const url = query ? `${path}?${query}` : path

  const response = await fetch(url, {
    body: req.body ? JSON.stringify(req.body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...req.headers,
    },
    method: req.method,
  })

  const responseBody: TResponse = await response.json().catch(() => ({}) as TResponse)

  return {
    body: responseBody,
    status: response.status,
  }
}
