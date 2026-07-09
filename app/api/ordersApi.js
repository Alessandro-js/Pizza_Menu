import { API_BASE_URL } from "../lib/apiClient";

export const CART_URLS = {
  orders: `${API_BASE_URL}/orders`,
  hystorical: `${API_BASE_URL}/orders`,
  addItem: `${API_BASE_URL}/cart/items/`,
  deleteItem: `${API_BASE_URL}/cart/items/`,
};
