// 1. Ini adalah TypeScript Interface.
// Tugasnya mendefinisikan "kontrak" atau bentuk wajib dari data produk kita.
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: "coffee" | "non-coffee" | "snack"; // Hanya boleh diisi salah satu dari 3 teks ini
  roastLevel?: "Light" | "Medium" | "Dark"; // Tanda tanya (?) berarti opsional (boleh tidak ada)
}

// 2. Ini adalah Array Data Produk yang menggunakan tipe "Product" di atas
export const COFFEE_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Espresso Blend",
    price: 28000,
    description:
      "Perpaduan biji kopi Arabika dan Robusta pilihan dengan rasa yang kuat, cokelat pekat, dan crema yang tebal.",
    image:
      "https://images.unsplash.com/photo-1510972527409-cca19de31749?q=80&w=500",
    category: "coffee",
    roastLevel: "Dark",
  },
  {
    id: "2",
    name: "Single Origin Gayo",
    price: 32000,
    description:
      "Kopi Arabika murni dari dataran tinggi Gayo dengan aroma rempah yang khas, keasaman rendah, dan body yang tebal.",
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=500",
    category: "coffee",
    roastLevel: "Medium",
  },
  {
    id: "3",
    name: "Caramel Macchiato",
    price: 35000,
    description:
      "Kombinasi espresso lembut dengan susu segar, sirup vanila, dan siraman saus karamel manis di atasnya.",
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=500",
    category: "coffee",
    roastLevel: "Light",
  },
  {
    id: "4",
    name: "Matcha Latte",
    price: 30000,
    description:
      "Teh hijau Jepang (Matcha) berkualitas tinggi yang dilarutkan dengan susu segar hangat yang lembut.",
    image:
      "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=500",
    category: "non-coffee",
  },
  {
    id: "5",
    name: "Almond Croissant",
    price: 25000,
    description:
      "Pastry mentega yang renyah di luar, lembut di dalam, dengan isian krim almond dan taburan kacang almond panggang.",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=500",
    category: "snack",
  },
];
