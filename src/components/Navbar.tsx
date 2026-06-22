"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const [isBouncing, setIsBouncing] = useState(false);

  // Efek ini akan berjalan setiap kali totalItems berubah
  useEffect(() => {
    if (totalItems > 0) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 300); // Animasi selesai dalam 300ms
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <nav className="sticky top-0 z-50 bg-[#FDF8F5]/80 backdrop-blur-md border-b border-[#E8DCC4]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-[#4A3B32] tracking-tight">
              Ryo<span className="text-[#C17A3E]">Coffe</span>
            </span>
          </Link>

          {/* Tombol Keranjang */}
          <Link href="/cart" className="relative">
            <div
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold transition-all duration-300 ${
                isBouncing
                  ? "bg-[#C17A3E] text-white scale-110 shadow-lg shadow-[#C17A3E]/40" // Efek saat item ditambah
                  : "bg-[#4A3B32] text-white hover:bg-[#322822]" // Efek normal
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
              </svg>
              <span>Cart ({totalItems})</span>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
