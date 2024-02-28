import "./globals.css";

import Banner from "./banner";
import Header from "./header";
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
      <body>
        <Header />
        <Banner />
        <div>{children}</div>
      </body>
    </html>
  );
}
