// AUTH_TOKEN_KEY is the AsyncStorage key for the short-lived JWT access token.
// Session persistence is handled by the server via an HttpOnly "pid" cookie —
// there is no refresh token in the response body.
// Use AuthContext (app/contexts/AuthContext.jsx) for all auth operations.
export const AUTH_TOKEN_KEY = "authToken";
