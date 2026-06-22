"use client";

import { Product } from "../data/products";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="group flex flex-col bg-white rounded-3xl p-3 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out border border-stone-100">
      {/* Container Gambar */}
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-stone-100 mb-5">
        <Link
          href={`/product/${product.id}`}
          className="block w-full h-full relative"
        >
          {/* Hapus fill, ganti dengan width dan height */}
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={500}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </Link>
        {/* Badge Kategori */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-extrabold text-[#C17A3E] uppercase tracking-widest shadow-sm pointer-events-none">
          {product.category}
        </span>

        {/* Tombol Add to Cart */}
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="absolute bottom-3 right-3 bg-[#4A3B32] text-white p-3.5 rounded-2xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 ease-out hover:bg-[#C17A3E] shadow-lg"
          title="Tambah ke Keranjang"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>

      {/* Container Teks */}
      <div className="flex flex-col px-2 pb-2">
        <div className="flex justify-between items-start gap-3 mb-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-lg font-bold text-stone-800 leading-tight hover:text-[#C17A3E] transition-colors">
              {product.name}
            </h3>
          </Link>
          <span className="text-base font-extrabold text-[#C17A3E] whitespace-nowrap bg-orange-50 px-2 py-1 rounded-lg">
            {formattedPrice}
          </span>
        </div>

        <p className="text-sm text-stone-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>
    </div>
  );
}
