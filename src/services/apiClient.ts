type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ApiClientConfig {
  mockMode: boolean;
  baseUrl: string;
}

export interface ApiRequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  query?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
  delayMs?: number;
}

export const apiConfig: ApiClientConfig = {
  mockMode: true,
  baseUrl: ""
};

export function setApiConfig(nextConfig: Partial<ApiClientConfig>) {
  Object.assign(apiConfig, nextConfig);
}

function buildUrl(path: string, query?: ApiRequestOptions["query"]) {
  const baseUrl = apiConfig.baseUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${baseUrl}${normalizedPath}`);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

export async function apiRequest<TResponse, TBody = unknown>(
  path: string,
  options: ApiRequestOptions<TBody> = {}
): Promise<TResponse> {
  if (!apiConfig.baseUrl) {
    throw new Error("apiConfig.baseUrl is required when mockMode is false");
  }

  const response = await fetch(buildUrl(path, options.query), {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body)
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as TResponse;
}

export async function requestWithMock<TResponse, TBody = unknown>(
  path: string,
  mockData: TResponse,
  options: ApiRequestOptions<TBody> = {}
): Promise<TResponse> {
  if (apiConfig.mockMode) {
    return mockRequest(mockData, options.delayMs);
  }

  return apiRequest<TResponse, TBody>(path, options);
}

export async function mockRequest<T>(data: T, delayMs = 220): Promise<T> {
  return new Promise<T>((resolve) => {
    setTimeout(() => resolve(data), delayMs);
  });
}

export async function mockMutation<T>(data: T, delayMs = 180): Promise<T> {
  return mockRequest(data, delayMs);
}

export async function mutateWithMock<TResponse, TBody = unknown>(
  path: string,
  mockData: TResponse,
  options: ApiRequestOptions<TBody> = {}
): Promise<TResponse> {
  if (apiConfig.mockMode) {
    return mockMutation(mockData, options.delayMs);
  }

  return apiRequest<TResponse, TBody>(path, {
    method: options.method ?? "POST",
    ...options
  });
}
