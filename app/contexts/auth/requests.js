import { AUTH_URLS } from "../../api/authApi";

export function requestRefreshToken() {
  return fetch(AUTH_URLS.refreshToken, {
    method: "POST",
    credentials: "include",
  });
}

export function requestLogout() {
  return fetch(AUTH_URLS.logout, {
    method: "POST",
    credentials: "include",
  });
}

export function requestLogin(email, password) {
  return fetch(AUTH_URLS.login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
}

export function buildAuthHeaders(headers = {}, token) {
  const nextHeaders = {
    ...headers,
    "x-access-token": token,
    Authorization: `Bearer ${token}`,
  };

  if (!("Content-Type" in headers)) {
    nextHeaders["Content-Type"] = "application/json";
  } else if (headers["Content-Type"] === undefined) {
    delete nextHeaders["Content-Type"];
  }

  return nextHeaders;
}
