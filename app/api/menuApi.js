import { API_BASE_URL } from "../lib/apiClient";

export const MENU_URLS = {
  categories: `${API_BASE_URL}/categories`,
  allProducts: `${API_BASE_URL}/products`,
  products: `${API_BASE_URL}/products/`,
  popolar: `${API_BASE_URL}/products/popular`,
  recommended: `${API_BASE_URL}/products/recommended`,
};
