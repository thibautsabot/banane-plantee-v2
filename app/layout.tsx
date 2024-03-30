import "./globals.css";

import Footer from "./layout/footer";
import Header from "./layout/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banane Plantée",
  description: "Le site de cuisine zéro dechet !",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="bg-[#f0ecec]">
        <Header />
        <div className="max-w-[1344px] mx-auto mb-8">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
