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
  metadataBase: new URL("https://gocarscanning.com"),

  title: "GO Cars Canning | Vehículos 0 km y usados",

  description:
    "Concesionaria de vehículos 0 km y usados en Canning. Financiación, consignaciones y atención personalizada en GO Cars.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "GO Cars Canning | Vehículos 0 km y usados",
    description:
      "Vehículos 0 km y usados en Canning, financiación, consignaciones y atención personalizada.",
    url: "https://gocarscanning.com",
    siteName: "GO Cars Canning",
    type: "website",
    locale: "es_AR",
    images: [
      {
        url: "/homeimage.png",
        width: 1200,
        height: 630,
        alt: "GO Cars Canning - Vehículos 0 km y usados",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "GO Cars Canning | Vehículos 0 km y usados",
    description:
      "Vehículos 0 km y usados en Canning, financiación, consignaciones y atención personalizada.",
    images: ["/homeimage.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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