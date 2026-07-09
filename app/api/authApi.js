import { API_BASE_URL } from "../lib/apiClient";

export const AUTH_URLS = {
  login: `${API_BASE_URL}/auth/login/`,
  logout: `${API_BASE_URL}/auth/logout/`,
  register: `${API_BASE_URL}/auth/register`,
  otp: `${API_BASE_URL}/auth/register/otp`,
  resendOtp: `${API_BASE_URL}/auth/resend-otp`,
  refreshToken: `${API_BASE_URL}/auth/refresh_token`,
  changePassword: (email) =>
    `${API_BASE_URL}/auth/change_password/${encodeURIComponent(email)}`,
  changePasswordOtp: `${API_BASE_URL}/auth/change_password/confirm`,
};
