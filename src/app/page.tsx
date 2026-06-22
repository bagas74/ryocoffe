import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { supabase } from "@/utils/supabase";
import { Product } from "@/data/products";

export const revalidate = 0;

export default async function Home() {
  const { data: products, error } = await supabase
    .from("products")
    .select(
      "id, name, price, description, image:image_url, category, roastLevel:roast_level",
    );

  if (error) {
    console.error("Gagal mengambil data:", error.message);
  }

  return (
    <div className="min-h-screen bg-[#FDF8F5] font-sans pb-24 selection:bg-[#C17A3E] selection:text-white">
      {/* Animasi Promo Banner */}
      <div className="bg-[#4A3B32] text-[#E8DCC4] py-2.5 text-center text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-3 relative overflow-hidden">
        <span className="animate-pulse">✨</span>
        <p>
          Promo Spesial: Diskon 20% untuk pembelian{" "}
          <span className="text-white font-bold">Single Origin Gayo</span> hari
          ini!
        </p>
        <span className="animate-pulse">✨</span>
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-16">
        <div className="text-center mb-20 relative">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-100/80 text-[#C17A3E] text-sm font-extrabold mb-8 animate-bounce border border-orange-200 shadow-sm backdrop-blur-sm">
            🎉 Biji Kopi Pilihan Telah Hadir!
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-[#4A3B32] mb-6 tracking-tight drop-shadow-sm">
            Sip the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C17A3E] to-[#e8a365]">
              Perfect
            </span>{" "}
            Roast
          </h1>

          <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-medium">
            Temukan berbagai pilihan biji kopi premium, racikan minuman spesial,
            dan camilan lezat untuk menemani harimu.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {products &&
            products.map((product) => (
              <div
                key={product.id}
                className="animate-in fade-in zoom-in duration-500 slide-in-from-bottom-8"
              >
                <ProductCard product={product as Product} />
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
