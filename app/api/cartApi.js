import { API_BASE_URL } from "../lib/apiClient";

export const CART_URLS = {
  cart: `${API_BASE_URL}/cart`,
  item: `${API_BASE_URL}/cart/items`,
  addItem: `${API_BASE_URL}/cart/items/`,
  deleteItem: `${API_BASE_URL}/cart/items/`,
};
