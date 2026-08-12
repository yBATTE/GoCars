"use client";

import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/public-api";

const WHATSAPP_MESSAGE =
  "Hola Go Cars, me gustaría obtener más información sobre los vehículos disponibles.";

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 hover:bg-[#128C7E] md:hidden"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -right-1 -top-1 h-4 w-4 animate-ping rounded-full bg-primary" />
      <span className="absolute -right-1 -top-1 h-4 w-4 rounded-full bg-primary" />
    </a>
  );
}