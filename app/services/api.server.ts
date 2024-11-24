import { authCookie, redirectToLogin } from "~/services/auth.server";

export const baseUrl = process.env.BASE_URL;

interface FetchOptions extends RequestInit {
  token?: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async fetch<T>(endpoint: string, request: Request, options: FetchOptions = {}): Promise<T> {
    const token = await authCookie.parse(request.headers.get("Cookie"));

    const headers = new Headers(options.headers);

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401 || response.status === 403) {
      redirectToLogin();
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async get<T>(endpoint: string, request: Request, options: FetchOptions = {}) {
    return this.fetch<T>(endpoint, request, {
      ...options,
      method: "GET",
    });
  }

  async post<T>(endpoint: string, request: Request, data: unknown, options: FetchOptions = {}) {
    return this.fetch<T>(endpoint, request, {
      ...options,
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    });
  }

  async put<T>(endpoint: string, request: Request, data: unknown, options: FetchOptions = {}) {
    return this.fetch<T>(endpoint, request, {
      ...options,
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        ...options.headers,
        "Content-Type": "application/json",
      },
    });
  }

  async delete<T>(endpoint: string, request: Request, options: FetchOptions = {}) {
    return this.fetch<T>(endpoint, request, {
      ...options,
      method: "DELETE",
    });
  }
}

export const api = new ApiClient(process.env.BASE_URL ?? "");
