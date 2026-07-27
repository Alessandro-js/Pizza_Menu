import { useCallback, useEffect, useState } from "react";
import { MENU_URLS } from "../api/menuApi";

export function useMenuFlow() {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadMenu = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(MENU_URLS.menu);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      // Se la tua API restituisce { success: true, data: [...] }

      setMenu(data.data.map((item) => ({ ...item, price: item.price / 100 })));
      console.log(menu);
    } catch (err) {
      console.error(err);
      setError("Impossibile caricare il menu.");
      setMenu([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMenu();
  }, []);

  return {
    menu,
    loading,
    error,
    refreshing,
    loadMenu,
  };
}
