const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
    const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

    // Add auth header if needed (handled by NextAuth in many cases, but helpful for manual calls)
    return fetch(url, options);
}

export { API_URL };
