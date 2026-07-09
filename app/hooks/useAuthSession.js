import { useCallback, useEffect, useRef, useState } from "react";
import {
    buildAuthHeaders,
    requestLogin,
    requestLogout,
    requestRefreshToken,
} from "../contexts/auth/requests";
import { clearAccessToken, persistAccessToken } from "../contexts/auth/storage";

export function useAuthSession() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [authSessionCacheKey, setAuthSessionCacheKey] = useState(Date.now());
  const [athleteStatus, setAthleteStatus] = useState(false);
  const mountedRef = useRef(true);
  const tokenRef = useRef(null);
  const athleteStatusRef = useRef(false);

  const applyAuthenticatedState = useCallback(async (token) => {
    await persistAccessToken(token);
    tokenRef.current = token;
    setAccessToken(token);
    setIsAuthenticated(true);
    setAuthSessionCacheKey(Date.now());
  }, []);

  const clearSessionState = useCallback(async () => {
    await clearAccessToken();
    tokenRef.current = null;
    setAccessToken(null);
    setIsAuthenticated(false);
    setAuthSessionCacheKey(Date.now());
    setAthleteStatus(false);
    athleteStatusRef.current = false;
  }, []);

  const logout = useCallback(async () => {
    try {
      await requestLogout();
    } catch (_error) {}

    await clearSessionState();
  }, [clearSessionState]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await requestRefreshToken();

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      const token = data.accessToken || null;

      if (token) {
        await applyAuthenticatedState(token);
      }

      setAthleteStatus(data.athlete_status === true);
      athleteStatusRef.current = data.athlete_status === true;

      return token;
    } catch (_error) {
      return null;
    }
  }, [applyAuthenticatedState]);

  useEffect(() => {
    mountedRef.current = true;

    const restoreSession = async () => {
      try {
        const response = await requestRefreshToken();

        if (response.ok) {
          const data = await response.json();
          const token = data.accessToken || null;

          if (token && mountedRef.current) {
            await applyAuthenticatedState(token);
          }

          if (mountedRef.current) {
            setAthleteStatus(data.athlete_status === true);
            athleteStatusRef.current = data.athlete_status === true;
          }
        }
      } catch (_error) {
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      mountedRef.current = false;
    };
  }, [applyAuthenticatedState]);

  const authFetch = useCallback(
    async (url, options = {}) => {
      const response = await fetch(url, {
        ...options,
        headers: buildAuthHeaders(options.headers, tokenRef.current),
      });

      if (response.status !== 401) {
        return response;
      }

      const newToken = await refreshAccessToken();
      if (!newToken) {
        await logout();
        return response;
      }

      return fetch(url, {
        ...options,
        headers: buildAuthHeaders(options.headers, newToken),
      });
    },
    [logout, refreshAccessToken],
  );

  const login = useCallback(
    async (email, password) => {
      await requestLogout().catch(() => {});

      const response = await requestLogin(email, password);

      if (response.ok) {
        const data = await response.json();
        const token = data.token || null;

        if (token) {
          await applyAuthenticatedState(token);
        }

        setAthleteStatus(data.athlete_status === true);
        athleteStatusRef.current = data.athlete_status === true;
      }

      return response.status;
    },
    [applyAuthenticatedState],
  );

  return {
    isLoading,
    isAuthenticated,
    accessToken,
    authSessionCacheKey,
    athleteStatus,
    login,
    logout,
    refreshAccessToken,
    authFetch,
  };
}
