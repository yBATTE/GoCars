"use client";

import Image from "next/image";
import {
  Instagram,
  MapPin,
  MessageCircle,
} from "lucide-react";

import {
  INSTAGRAM_URL,
  WHATSAPP_NUMBER,
} from "@/lib/public-api";

const quickLinks = [
  {
    href: "#inicio",
    label: "Inicio",
  },
  {
    href: "#catalogo",
    label: "Catálogo",
  },
  {
    href: "#contacto",
    label: "Contacto",
  },
];

const DEFAULT_LOCATION = "Canning, Buenos Aires";

function getInstagramUsername(url: string) {
  try {
    const pathname = new URL(url).pathname;
    const username = pathname
      .split("/")
      .filter(Boolean)[0];

    return username ? `@${username}` : "@gocars";
  } catch {
    return "@gocars";
  }
}

function getWhatsappDisplay(number: string) {
  const digits = number.replace(/\D/g, "");

  if (!digits) {
    return "WhatsApp";
  }

  return `+${digits}`;
}

export function Footer() {
  const whatsappMessage =
    "Hola GO Cars, me gustaría obtener más información sobre los vehículos disponibles.";

  const whatsappUrl =
    `https://wa.me/${WHATSAPP_NUMBER}?text=` +
    encodeURIComponent(whatsappMessage);

  const instagramUsername =
    getInstagramUsername(INSTAGRAM_URL);

  const whatsappDisplay =
    getWhatsappDisplay(WHATSAPP_NUMBER);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#070707]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Marca */}
          <div className="lg:col-span-2">
            <Image
              src="/logo-gocars.jpg"
              alt="GO Cars"
              width={180}
              height={80}
              className="mb-5 h-14 w-auto object-contain"
            />

            <p className="mb-6 max-w-md leading-relaxed text-white/55">
              GO Cars. Vehículos 0 km y usados de distintas
              marcas, con atención personalizada, opciones de
              financiación y consignaciones.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#25D366]/25 bg-[#25D366]/10 text-[#25D366] transition-all hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
                aria-label="Contactar por WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#e30613]/25 bg-[#e30613]/10 text-[#e30613] transition-all hover:border-[#e30613] hover:bg-[#e30613] hover:text-white"
                aria-label="Visitar Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Enlaces */}
          <div>
            <h4 className="mb-5 font-display text-lg font-semibold uppercase tracking-wide text-white">
              Enlaces rápidos
            </h4>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-display text-white/55 transition-colors hover:text-[#e30613]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="mb-5 font-display text-lg font-semibold uppercase tracking-wide text-white">
              Contacto
            </h4>

            <div className="space-y-4 text-white/55">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-[#e30613]" />

                <p>{DEFAULT_LOCATION}</p>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[#25D366]"
              >
                <MessageCircle className="h-5 w-5 flex-shrink-0" />

                <span>{whatsappDisplay}</span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-[#e30613]"
              >
                <Instagram className="h-5 w-5 flex-shrink-0" />

                <span>{instagramUsername}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Línea inferior */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <p className="text-sm text-white/40">
              © {currentYear} GO Cars. Todos los derechos
              reservados.
            </p>

            <p className="text-sm text-white/40">
              Canning, Buenos Aires, Argentina
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}