const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  role: string;
  username: string;
}

export async function login(username: string, password: string): Promise<AuthTokens> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? 'Credenciais inválidas');
  }

  return res.json();
}

export async function refreshTokens(refreshToken: string): Promise<AuthTokens> {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${refreshToken}` },
  });

  if (!res.ok) throw new Error('Sessão expirada');
  return res.json();
}

export async function logout(accessToken: string): Promise<void> {
  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

/** Faz uma requisição autenticada já incluindo o Bearer token. */
export async function authFetch(
  url: string,
  accessToken: string,
  options: RequestInit = {},
): Promise<Response> {
  return fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });
}

// ── Cookie helpers ────────────────────────────────────────────────────────────

function setCookie(name: string, value: string, days: number): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Strict`;
}

function removeCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
}

// ── LocalStorage + Cookie helpers (client-side only) ─────────────────────────

const ACCESS_KEY = 'ap_access_token';
const REFRESH_KEY = 'ap_refresh_token';
const ROLE_KEY = 'ap_role';
const USERNAME_KEY = 'ap_username';

/** Notifica todos os listeners (AuthContext, etc.) que o estado de auth mudou. */
function notifyAuthChange(): void {
  window.dispatchEvent(new Event('ap:auth-change'));
}

export function saveTokens(tokens: AuthTokens): void {
  localStorage.setItem(ACCESS_KEY, tokens.accessToken);
  localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
  localStorage.setItem(ROLE_KEY, tokens.role);
  localStorage.setItem(USERNAME_KEY, tokens.username ?? '');
  // Cookies são lidos pelo middleware Next.js
  setCookie('ap_access', tokens.accessToken, 1);
  setCookie('ap_role', tokens.role, 1);
  notifyAuthChange();
}
  setCookie('ap_role', tokens.role, 1);
  notifyAuthChange();
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function getRole(): string | null {
  return localStorage.getItem(ROLE_KEY);
}

export function getUsername(): string | null {
  return localStorage.getItem(USERNAME_KEY) || null;
}

export function clearTokens(): void {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(USERNAME_KEY);
  removeCookie('ap_access');
  removeCookie('ap_role');
  notifyAuthChange();
}

export function isLoggedIn(): boolean {
  return !!getAccessToken();
}
