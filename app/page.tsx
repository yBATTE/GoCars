import { Hero } from "@/components/hero";
import { Catalog } from "@/components/catalog";
import { Trust } from "@/components/trust";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Catalog />
      <Trust />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}