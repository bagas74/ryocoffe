"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/utils/supabase";

export default function CartPage() {
  const { cartItems, clearCart } = useCart();

  // State untuk menandai apakah tombol checkout sedang ditekan (loading)
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const formattedTotalPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(totalPrice);

  // Fungsi Inti Transaksi Database
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setIsCheckingOut(true);

    try {
      // 1. Catat Total Belanja ke tabel 'orders'
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([{ total_amount: totalPrice, status: "pending" }])
        .select("id") // Minta Supabase mengembalikan ID pesanannya
        .single();

      if (orderError) throw orderError;

      const orderId = orderData.id;

      // 2. Siapkan data barang untuk dimasukkan ke tabel 'order_items'
      const itemsToInsert = cartItems.map((item) => ({
        order_id: orderId,
        product_id: item.id,
        quantity: item.quantity,
        price_at_time: item.price,
      }));

      // 3. Masukkan semua barang sekaligus
      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemsToInsert);

      if (itemsError) throw itemsError;

      // 4. Jika sukses, kosongkan keranjang dan beri tahu pengguna
      clearCart();
      alert("Yeay! Pesanan berhasil dibuat! ☕ Terima kasih telah berbelanja.");
    } catch (error) {
      console.error("Gagal melakukan checkout:", error);
      alert("Maaf, terjadi kesalahan pada sistem. Silakan coba lagi.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans pb-20">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-extrabold text-[#4A3B32] mb-8">
          Keranjang Belanja
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-stone-100">
            <p className="text-stone-500 mb-6 text-lg font-medium">
              Keranjang kamu masih kosong, nih ☕
            </p>
            <Link
              href="/"
              className="inline-block bg-[#C17A3E] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#a86832] transition-colors shadow-md"
            >
              Lihat Menu Kopi
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-stone-100 p-6 sm:p-8">
            <ul className="divide-y divide-stone-100">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="py-6 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Menggunakan Next.js Image */}
                    <div className="relative w-20 h-20 flex-shrink-0 bg-stone-100 rounded-xl overflow-hidden border border-stone-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-stone-800">
                        {item.name}
                      </h3>
                      <p className="text-sm font-medium text-stone-500 mt-1">
                        {new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                          minimumFractionDigits: 0,
                        }).format(item.price)}{" "}
                        x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="text-lg font-extrabold text-[#C17A3E]">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(item.price * item.quantity)}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-8 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="text-center sm:text-left">
                <p className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-1">
                  Total Pembayaran
                </p>
                <p className="text-3xl font-extrabold text-[#4A3B32]">
                  {formattedTotalPrice}
                </p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full sm:w-auto bg-[#4A3B32] disabled:bg-stone-400 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#322822] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3"
              >
                {isCheckingOut ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    Memproses...
                  </>
                ) : (
                  "Checkout Sekarang"
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
