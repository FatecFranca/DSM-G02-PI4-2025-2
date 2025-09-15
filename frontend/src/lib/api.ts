const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<TBody> {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: TBody;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
}

export async function apiFetch<TResponse, TBody = unknown>(path: string, options: RequestOptions<TBody> = {}): Promise<TResponse> {
    const url = path.startsWith("http") ? path : `${baseUrl}${path.startsWith("/") ? "" : "/"}${path}`;

    const { method = "GET", headers = {}, body, cache, next } = options;

    const finalHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...headers,
    };

    const response = await fetch(url, {
        method,
        headers: finalHeaders,
        body: body !== undefined ? JSON.stringify(body) : undefined,
        cache,
        next,
    } as RequestInit & { next?: NextFetchRequestConfig });

    if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`API error ${response.status}: ${text || response.statusText}`);
    }

    // Attempt JSON parse; return as any if empty
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as TResponse;
    }
    return (await response.text()) as unknown as TResponse;
}

export const api = {
    get: <T>(path: string, opts: Omit<RequestOptions<never>, "method" | "body"> = {}) =>
        apiFetch<T>(path, { ...opts, method: "GET" }),
    post: <T, B = unknown>(path: string, body: B, opts: Omit<RequestOptions<B>, "method"> = {}) =>
        apiFetch<T, B>(path, { ...opts, method: "POST", body }),
    put: <T, B = unknown>(path: string, body: B, opts: Omit<RequestOptions<B>, "method"> = {}) =>
        apiFetch<T, B>(path, { ...opts, method: "PUT", body }),
    patch: <T, B = unknown>(path: string, body: B, opts: Omit<RequestOptions<B>, "method"> = {}) =>
        apiFetch<T, B>(path, { ...opts, method: "PATCH", body }),
    delete: <T>(path: string, opts: Omit<RequestOptions<never>, "method" | "body"> = {}) =>
        apiFetch<T>(path, { ...opts, method: "DELETE" }),
};

export default api;


