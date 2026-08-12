"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Instagram, Menu, MessageCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/public-api";

const WHATSAPP_MESSAGE =
  "Hola GO Cars, me gustaría obtener más información sobre los vehículos disponibles.";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const whatsappUrl = useMemo(() => {
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      WHATSAPP_MESSAGE
    )}`;
  }, []);

  const solidHeader = isScrolled || !isHome || isMobileMenuOpen;

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleInicioClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsMobileMenuOpen(false);
  };

  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  const desktopLinkClasses =
    "text-sm font-semibold text-white/85 hover:text-primary transition-colors uppercase tracking-wider font-display";

  const mobileLinkClasses =
    "text-2xl font-semibold text-white hover:text-primary transition-colors uppercase tracking-wider font-display";

  const renderDesktopNav = () => {
    if (isHome) {
      return (
        <nav className="hidden items-center gap-10 md:flex">
          <button
            type="button"
            onClick={handleInicioClick}
            className={desktopLinkClasses}
          >
            Inicio
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("catalogo")}
            className={desktopLinkClasses}
          >
            Catálogo
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("contacto")}
            className={desktopLinkClasses}
          >
            Contacto
          </button>
        </nav>
      );
    }

    return (
      <nav className="hidden items-center gap-10 md:flex">
        <Link href="/" className={desktopLinkClasses}>
          Inicio
        </Link>

        <Link href="/#catalogo" className={desktopLinkClasses}>
          Catálogo
        </Link>

        <Link href="/#contacto" className={desktopLinkClasses}>
          Contacto
        </Link>
      </nav>
    );
  };

  const renderMobileNav = () => {
    if (isHome) {
      return (
        <>
          <button
            type="button"
            onClick={handleInicioClick}
            className={mobileLinkClasses}
          >
            Inicio
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("catalogo")}
            className={mobileLinkClasses}
          >
            Catálogo
          </button>

          <button
            type="button"
            onClick={() => handleSectionClick("contacto")}
            className={mobileLinkClasses}
          >
            Contacto
          </button>
        </>
      );
    }

    return (
      <>
        <Link
          href="/"
          onClick={() => setIsMobileMenuOpen(false)}
          className={mobileLinkClasses}
        >
          Inicio
        </Link>

        <Link
          href="/#catalogo"
          onClick={() => setIsMobileMenuOpen(false)}
          className={mobileLinkClasses}
        >
          Catálogo
        </Link>

        <Link
          href="/#contacto"
          onClick={() => setIsMobileMenuOpen(false)}
          className={mobileLinkClasses}
        >
          Contacto
        </Link>
      </>
    );
  };

  const logo = (
    <Image
      src="/logo-gocars.jpg"
      alt="GO Cars"
      width={180}
      height={70}
      className="h-9 w-auto object-contain md:h-11"
      priority
    />
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solidHeader
          ? "border-b border-white/10 bg-black/95 shadow-xl backdrop-blur-md"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {isHome ? (
            <button
              type="button"
              onClick={handleInicioClick}
              className="relative z-10"
              aria-label="Ir al inicio"
            >
              {logo}
            </button>
          ) : (
            <Link
              href="/"
              className="relative z-10"
              aria-label="Ir al inicio"
            >
              {logo}
            </Link>
          )}

          {renderDesktopNav()}

          <div className="hidden items-center gap-3 md:flex">
            <Button
              asChild
              variant="outline"
              className="border-white/15 bg-black/25 text-white hover:border-primary hover:bg-primary hover:text-white"
            >
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="mr-2 h-4 w-4" />
                Instagram
              </a>
            </Button>

            <Button
              asChild
              className="bg-[#25D366] text-white hover:bg-[#128C7E]"
            >
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                WhatsApp
              </a>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="relative z-10 rounded-md p-2 text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label={
              isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"
            }
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 top-20 bg-black/98 transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col items-center gap-7 px-6 pt-14">
          {renderMobileNav()}

          <Button
            asChild
            variant="outline"
            className="mt-3 w-full max-w-xs border-white/20 bg-transparent text-white hover:border-primary hover:bg-primary"
          >
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </a>
          </Button>

          <Button
            asChild
            className="w-full max-w-xs bg-[#25D366] text-white hover:bg-[#128C7E]"
          >
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              WhatsApp
            </a>
          </Button>
        </nav>
      </div>
    </header>
  );
}