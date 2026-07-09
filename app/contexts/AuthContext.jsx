import { createContext, useContext } from "react";
import { useAuthSession } from "../hooks/useAuthSession";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const authState = useAuthSession();

  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
