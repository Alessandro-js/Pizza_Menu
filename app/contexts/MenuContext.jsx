import { createContext, useContext } from "react";
import { useMenuFlow } from "../hooks/useMenuFlow";

const MenuContext = createContext(null);

export function MenuProvider({ children }) {
  const MenuState = useMenuFlow();

  return (
    <MenuContext.Provider value={MenuState}>{children}</MenuContext.Provider>
  );
}

export function useMenu() {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error("useMenu must be used inside MenuProvider");
  }
  return ctx;
}
