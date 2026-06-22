"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { Product } from "@/data/products";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image"; // <-- 1. Ini wajib ditambahkan

export default function ProductDetailPage() {
  const params = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select(
            "id, name, price, description, image:image_url, category, roastLevel:roast_level",
          )
          .eq("id", params.id)
          .single();

        if (error) throw error;
        if (data) setProduct(data as Product);
      } catch (err) {
        console.error("Gagal mengambil detail produk:", err);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF8F5] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C17A3E]"></div>
        <p className="mt-4 text-stone-600 font-medium">
          Memuat racikan kopi...
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FDF8F5] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-[#4A3B32] mb-4">
          Produk tidak ditemukan 🥲
        </h1>
        <Link href="/" className="text-[#C17A3E] hover:underline font-medium">
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans pb-20">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#4A3B32] mb-8 font-medium transition-colors w-fit px-4 py-2 rounded-xl hover:bg-gray-100"
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
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Kembali ke Menu
        </Link>

        {/* 2. INI PEMBUNGKUS YANG HILANG (Warna Putih & Flex Row) */}
        <div className="bg-white rounded-3xl shadow-sm border border-[#E8DCC4]/50 p-6 sm:p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center md:items-start">
            {/* Bagian Gambar Produk Kiri */}
            <div className="w-full md:w-1/2 flex-shrink-0">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-stone-100 border border-gray-100 shadow-inner">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-white/95 px-4 py-1.5 rounded-full text-xs font-bold text-[#4A3B32] uppercase tracking-wider shadow-sm backdrop-blur-sm">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Informasi Detail Kanan */}
            <div className="w-full md:w-1/2 flex flex-col pt-2 md:pt-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#4A3B32] mb-3 leading-tight">
                {product.name}
              </h1>

              <div className="text-2xl sm:text-3xl font-bold text-[#C17A3E] mb-6">
                {formattedPrice}
              </div>

              <div className="w-16 h-1 bg-[#E8DCC4] rounded-full mb-6"></div>

              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {product.category === "coffee" && product.roastLevel && (
                <div className="mb-10 flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Roast Level:
                  </span>
                  <span className="bg-[#4A3B32] text-white px-3 py-1 rounded-md text-sm font-medium shadow-sm">
                    {product.roastLevel}
                  </span>
                </div>
              )}

              <button
                onClick={() => addToCart(product)}
                className="w-full sm:w-auto mt-auto bg-[#C17A3E] hover:bg-[#a86832] text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all shadow-lg flex justify-center items-center gap-3 active:scale-95"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                Tambah ke Keranjang
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
