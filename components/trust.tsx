"use client";

import {
  Users,
  Car,
  CreditCard,
  RefreshCw,
  MapPin,
  Quote,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Atención Personalizada",
    description:
      "Asesoramiento directo para ayudarte a encontrar un vehículo acorde a lo que buscás.",
  },
  {
    icon: Car,
    title: "Publicaciones Claras",
    description:
      "Información ordenada, imágenes reales y unidades cargadas desde el panel de gestión.",
  },
  {
    icon: CreditCard,
    title: "Opciones de Financiación",
    description:
      "Consultá por alternativas de financiación y analizamos la opción más conveniente.",
  },
  {
    icon: RefreshCw,
    title: "Tomamos tu Usado",
    description:
      "Podés consultarnos por toma, consignación o dejar tu vehículo como parte de pago.",
  },
  {
    icon: MapPin,
    title: "Ubicación en Canning",
    description:
      "Atención en Canning, Buenos Aires, con seguimiento directo por WhatsApp e Instagram.",
  },
];

const testimonials = [
  {
    quote:
      "Muy buena atención y respuesta rápida. Todo claro desde la primera consulta.",
    author: "Martín G.",
    role: "Cliente",
  },
  {
    quote:
      "La publicación coincidía con el estado real del auto y la atención fue excelente.",
    author: "Carolina S.",
    role: "Cliente",
  },
  {
    quote:
      "Proceso simple, directo y con buena predisposición para resolver cada duda.",
    author: "Diego R.",
    role: "Cliente",
  },
];

export function Trust() {
  return (
    <section className="bg-secondary/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <span className="mb-3 inline-block font-display text-sm font-semibold uppercase tracking-wider text-primary">
            Por qué elegirnos
          </span>
          <h2 className="mb-4 text-balance font-display text-3xl font-bold uppercase tracking-wide text-foreground md:text-4xl lg:text-5xl">
            Confianza y Gestión Clara
          </h2>
          <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
            En Go Cars buscamos brindar una experiencia simple, transparente
            y directa para cada consulta.
          </p>
        </div>

        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>

              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-5xl">
          <h3 className="mb-10 text-center font-display text-2xl font-bold uppercase tracking-wide text-foreground">
            Lo que valoran nuestros clientes
          </h3>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <Quote className="mb-4 h-8 w-8 text-primary/30" />

                <p className="mb-6 italic leading-relaxed text-foreground/90">
                  {`"${testimonial.quote}"`}
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-display text-sm font-semibold text-primary">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>

                  <div>
                    <p className="font-display text-sm font-semibold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}