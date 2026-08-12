"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle,
  Instagram,
} from "lucide-react";
import {
  INSTAGRAM_URL,
  WHATSAPP_NUMBER,
} from "@/lib/public-api";

const DEFAULT_EMAIL = "info@gocars.com";
const DEFAULT_LOCATION = "Canning, Buenos Aires";

export function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    mensaje: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const whatsappUrl = useMemo(() => {
    const message = "Hola Go Cars, me gustaría obtener más información sobre los vehículos disponibles.";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, []);

  const mapsUrl = useMemo(() => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(DEFAULT_LOCATION)}`;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `Hola Go Cars, mi nombre es ${formData.nombre}.
Teléfono: ${formData.telefono}
Email: ${formData.email}

Mensaje:
${formData.mensaje}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        mensaje: "",
      });
    }, 2500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contacto" className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <span className="mb-3 inline-block font-display text-sm font-semibold uppercase tracking-wider text-primary">
            Contacto
          </span>
          <h2 className="mb-4 text-balance font-display text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl lg:text-5xl">
            Contactanos
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            Consultá por stock, financiación o toma de usado. Estamos para
            ayudarte a encontrar tu próximo vehículo.
          </p>
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <h3 className="mb-6 font-display text-xl font-bold uppercase tracking-wide text-foreground">
                Envianos un mensaje
              </h3>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366]/10">
                    <CheckCircle className="h-8 w-8 text-[#25D366]" />
                  </div>
                  <h4 className="mb-2 font-display text-lg font-semibold text-foreground">
                    ¡Te llevamos a WhatsApp!
                  </h4>
                  <p className="text-muted-foreground">
                    Tu consulta fue preparada para enviarse directamente a Go Cars.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="mb-2 block font-display text-sm font-medium text-foreground"
                    >
                      Nombre
                    </label>
                    <Input
                      id="nombre"
                      name="nombre"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      required
                      className="h-12 border-border bg-secondary"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="telefono"
                        className="mb-2 block font-display text-sm font-medium text-foreground"
                      >
                        Teléfono
                      </label>
                      <Input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        placeholder="Tu teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="h-12 border-border bg-secondary"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block font-display text-sm font-medium text-foreground"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 border-border bg-secondary"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="mensaje"
                      className="mb-2 block font-display text-sm font-medium text-foreground"
                    >
                      Mensaje
                    </label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      placeholder="¿En qué podemos ayudarte?"
                      value={formData.mensaje}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="resize-none border-border bg-secondary"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Enviar por WhatsApp
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-[#25D366]/20 bg-[#25D366]/10 p-6">
                <h3 className="mb-3 font-display text-xl font-bold text-foreground">
                  ¿Preferís WhatsApp?
                </h3>
                <p className="mb-4 text-muted-foreground">
                  Escribinos directamente y te respondemos de forma rápida.
                </p>
                <Button
                  asChild
                  className="h-12 w-full bg-[#25D366] font-semibold text-white hover:bg-[#128C7E]"
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Hablar por WhatsApp
                  </a>
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-6 font-display text-xl font-bold uppercase tracking-wide text-foreground">
                  Datos de contacto
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ubicación</p>
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {DEFAULT_LOCATION}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">WhatsApp</p>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display font-medium text-foreground transition-colors hover:text-primary"
                      >
                        +54 9 11 1234-5678
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${DEFAULT_EMAIL}`}
                        className="font-display font-medium text-foreground transition-colors hover:text-primary"
                      >
                        {DEFAULT_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Instagram className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instagram</p>
                      <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-display font-medium text-foreground transition-colors hover:text-primary"
                      >
                        @gocars_canning
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="mb-3 font-display text-lg font-bold uppercase tracking-wide text-foreground">
                  Atención personalizada
                </h3>
                <p className="text-muted-foreground leading-7">
                  Si viste una unidad en la web, escribinos directo por WhatsApp y
                  te pasamos disponibilidad, más fotos, opciones de financiación
                  o toma de usado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}