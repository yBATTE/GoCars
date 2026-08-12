"use client";

import Image from "next/image";
import {
  Award,
  Car,
  ChevronDown,
  CreditCard,
  MessageCircle,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { WHATSAPP_NUMBER } from "@/lib/public-api";

const WHATSAPP_MESSAGE =
  "Hola GO Cars, me gustaría obtener más información sobre los vehículos disponibles.";

const badges = [
  {
    icon: Car,
    label: "0 km y Usados",
  },
  {
    icon: Award,
    label: "Todas las Marcas",
  },
  {
    icon: CreditCard,
    label: "Financiación",
  },
  {
    icon: RefreshCw,
    label: "Consignaciones",
  },
];

export function Hero() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-black"
    >
      {/* Imagen principal */}
      <div className="absolute inset-0">
        <Image
          src="/homeimage.png"
          alt="Vehículos disponibles en GO Cars"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Oscurecimiento para que se lea el texto */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Oscurecimiento extra arriba y abajo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/85" />

        {/* Sombra lateral */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-16 pt-32 md:pb-10 md:pt-28">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          <h1 className="max-w-5xl font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Vehículos{" "}
            <span className="text-primary">0 km y</span>
            <br className="hidden sm:block" />
            <span className="text-primary"> usados</span> con atención
            <br className="hidden md:block" />
            personalizada
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg md:text-xl">
            Encontrá en GO Cars una selección de vehículos de distintas marcas,
            con opciones de financiación y consignación.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 w-full rounded-md bg-primary px-10 font-display text-base font-semibold uppercase tracking-wide text-white hover:bg-primary/90 sm:w-auto"
            >
              <a href="#catalogo">Ver catálogo</a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-14 w-full rounded-md border-white/30 bg-black/40 px-8 font-display text-base font-semibold uppercase tracking-wide text-white backdrop-blur-sm hover:border-primary hover:bg-primary hover:text-white sm:w-auto"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Contactar por WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon;

              return (
                <div
                  key={badge.label}
                  className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/45 px-3 py-4 backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:bg-black/65"
                >
                  <Icon className="h-6 w-6 text-primary" />

                  <span className="text-center font-display text-sm font-semibold text-white md:text-base">
                    {badge.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <a
        href="#catalogo"
        aria-label="Ir al catálogo"
        className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce md:block"
      >
        <ChevronDown className="h-8 w-8 text-white/70" />
      </a>
    </section>
  );
}