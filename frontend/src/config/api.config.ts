export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Auth endpoints
export const AUTH_LOGIN_URL = `${API_URL}/auth/email/login`;
export const AUTH_REGISTER_URL = `${API_URL}/auth/email/register`;
export const AUTH_GOOGLE_LOGIN_URL = `${API_URL}/auth/google/login`;
export const AUTH_LOGOUT_URL = `${API_URL}/auth/logout`;
export const AUTH_ME_URL = `${API_URL}/auth/me`;
export const AUTH_REFRESH_URL = `${API_URL}/auth/refresh`;

// User endpoints
export const USERS_URL = `${API_URL}/users`;

// Other endpoints can be added here as needed 