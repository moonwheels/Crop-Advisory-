const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const TOKEN_KEY = "agrivision_token";
const isDevMode = import.meta.env.VITE_DEV_MODE === "true";

export type ApiUser = {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
};

export function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function ensureDevToken() {
  const existingToken = getStoredToken();
  if (existingToken || !isDevMode) {
    return existingToken;
  }

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "demo@agrivision.local",
      password: "devmode123",
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || "Failed to create dev session");
  }

  if (data?.token) {
    setStoredToken(data.token);
    return data.token as string;
  }

  return null;
}

export async function apiFetch<T>(path: string, options: RequestInit = {}, auth = true): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (auth) {
    const token = getStoredToken() || (await ensureDevToken());
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.error || "Request failed");
  }

  return data as T;
}

export async function postJson<T>(path: string, body: unknown, auth = true) {
  return apiFetch<T>(
    path,
    {
      method: "POST",
      body: JSON.stringify(body),
    },
    auth,
  );
}
