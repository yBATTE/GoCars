import type { Metadata, Viewport } from "next";
import { Oswald, Roboto } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/header";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GO Cars | Vehículos 0 km y usados",
  description:
    "GO Cars. Vehículos 0 km y usados de distintas marcas, financiación, consignaciones y atención personalizada.",
  keywords: [
    "GO Cars",
    "autos",
    "vehículos",
    "0 km",
    "usados",
    "concesionaria",
    "financiación",
    "consignaciones",
    "Buenos Aires",
  ],
  openGraph: {
    title: "GO Cars | Vehículos 0 km y usados",
    description:
      "Vehículos 0 km y usados, financiación, consignaciones y atención personalizada.",
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: "/homeimage.png",
        width: 1200,
        height: 630,
        alt: "GO Cars - Vehículos 0 km y usados",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GO Cars | Vehículos 0 km y usados",
    description:
      "Vehículos 0 km y usados, financiación, consignaciones y atención personalizada.",
    images: ["/homeimage.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${oswald.variable} ${roboto.variable} min-h-screen bg-black font-sans text-white antialiased`}
      >
        <Header />

        <main>{children}</main>

        <Analytics />
      </body>
    </html>
  );
}