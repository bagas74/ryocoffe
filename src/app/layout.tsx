import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Import CartProvider yang baru saja kita buat
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RyoCoffe - Premium Roast",
  description:
    "Temukan berbagai pilihan biji kopi premium dan racikan minuman spesial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Bungkus seluruh aplikasi dengan CartProvider */}
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
