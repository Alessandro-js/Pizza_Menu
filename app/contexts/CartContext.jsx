import { createContext, useContext, useState } from "react";

const CartContext = createContext({
  items: [],
  addToCart: (_product) => {},
  removeFromCart: () => {},
  cartTotal: 0,
  totalPrice: 0,
});

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product_id === product.product_id);
      if (existing) {
        return prev.map((i) =>
          i.product_id === product.product_id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (product_id) => {
    setItems((prev) => prev.filter((i) => i.product_id !== product_id));
  };

  const cartTotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const prices = items.map((item) => item.price);
  const totalPrice = items.reduce((sum, item) => sum + Number(item.price), 0);
  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, cartTotal, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
