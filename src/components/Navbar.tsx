"use client"; // Wajib ditambahkan karena kita menggunakan state/context

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  // Mengambil totalItems dari gudang data CartContext
  const { totalItems } = useCart();

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#FDF8F5] shadow-sm border-b border-[#E8DCC4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold text-[#4A3B32] tracking-wide"
          >
            Ryo<span className="text-[#C17A3E]">Coffe</span>
          </Link>

          <Link
            href="/cart"
            className="flex items-center gap-2 bg-[#4A3B32] text-white px-4 py-2 rounded-full hover:bg-[#322822] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span className="text-sm font-medium">Cart ({totalItems})</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
