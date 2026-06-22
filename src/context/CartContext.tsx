"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/data/products";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void; // <-- 1. Daftarkan fungsi baru di sini
  totalItems: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // 2. Implementasikan fungsi untuk mengurangi kuantitas atau menghapus item
  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === productId);

      if (!existingItem) return prevItems;

      if (existingItem.quantity === 1) {
        // Jika sisa 1, hapus item dari array keranjang
        return prevItems.filter((item) => item.id !== productId);
      } else {
        // Jika lebih dari 1, kurangi jumlahnya 1
        return prevItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    // 3. Masukkan removeFromCart ke dalam nilai Provider
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, totalItems, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart harus digunakan di dalam CartProvider");
  }
  return context;
}
