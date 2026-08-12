import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  WHATSAPP_NUMBER,
  formatPublicKm,
  formatPublicPrice,
  getPublicVehicle,
  getPublicVehicles,
} from "@/lib/public-api";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let payload;
  try {
    payload = await getPublicVehicle(slug);
  } catch {
    notFound();
  }

  const { vehicle, dealership } = payload;

  if (!vehicle) {
    notFound();
  }

  const vehicleName = vehicle.name;
  const vehicleKm = formatPublicKm(vehicle.kms);

  function buildWhatsappUrl(action: "info" | "financiacion" | "consignacion") {
    let message = "";

    if (action === "info") {
      message = `Hola ${dealership.name}, quiero información sobre el ${vehicleName}${
        vehicle.year ? ` ${vehicle.year}` : ""
      } con ${vehicleKm}, publicado a ${formatPublicPrice(
        vehicle.publicPrice,
        vehicle.currency,
      )}.`;
    }

    if (action === "financiacion") {
      message = `Hola ${dealership.name}, me interesa el ${vehicleName} con ${vehicleKm} que vi publicado en la web. Quisiera consultar opciones de financiación, anticipo y cuotas disponibles.`;
    }

    if (action === "consignacion") {
      message = `Hola ${dealership.name}, vi el ${vehicleName} con ${vehicleKm} publicado en la web y me interesó. También me gustaría consultar para dejar mi auto en consignación o tomarlo en parte de pago.`;
    }

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  const whatsappInfoUrl = buildWhatsappUrl("info");
  const whatsappFinanceUrl = buildWhatsappUrl("financiacion");
  const whatsappConsignacionUrl = buildWhatsappUrl("consignacion");

  const gallery =
    vehicle.images && vehicle.images.length > 0
      ? vehicle.images
      : vehicle.coverImage
        ? [vehicle.coverImage]
        : [];

  const allVehicles = await getPublicVehicles();
  const relatedVehicles = allVehicles.vehicles
    .filter((item) => item.id !== vehicle.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link
            href="/#catalogo"
            className="hover:text-primary transition-colors"
          >
            Catálogo
          </Link>
          <span className="mx-2">/</span>
          <span>{vehicle.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card">
              {gallery[0] ? (
                <Image
                  src={gallery[0].url}
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  Sin imagen
                </div>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {gallery.slice(0, 6).map((img, index) => (
                  <div
                    key={img.publicId || index}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-card"
                  >
                    <Image
                      src={img.url}
                      alt={`${vehicle.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="mb-4">
              <Badge className="bg-primary text-white">
                {vehicle.currency === "USD" ? "USD" : "ARS"}
              </Badge>
            </div>

            <p className="mb-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
              {dealership.name}
            </p>

            <h1 className="mb-4 text-3xl font-bold font-display md:text-5xl">
              {vehicle.name}
            </h1>

            <p className="mb-6 text-3xl font-bold text-primary font-display md:text-4xl">
              {formatPublicPrice(vehicle.publicPrice, vehicle.currency)}
            </p>

            <div className="mb-8 grid grid-cols-2 gap-3">
              <Spec label="Año" value={String(vehicle.year ?? "-")} />
              <Spec label="Kilómetros" value={formatPublicKm(vehicle.kms)} />
              <Spec label="Moneda" value={vehicle.currency} />
              <Spec label="Estado" value="Disponible" />
              <Spec label="Ubicación" value="Canning, Buenos Aires" />
              <Spec label="Concesionaria" value={dealership.name} />
            </div>

            <div className="mb-8 space-y-3">
              <Button
                asChild
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white"
              >
                <a
                  href={whatsappInfoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Consultar por WhatsApp
                </a>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <a
                  href={whatsappFinanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar financiación
                </a>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <a
                  href={whatsappConsignacionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Quiero dejar mi usado / consignación
                </a>
              </Button>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-3 text-xl font-semibold">Descripción</h2>
              <p className="leading-7 text-muted-foreground">
                {vehicle.description || "Sin descripción disponible."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {relatedVehicles.length > 0 && (
        <section className="container mx-auto px-4 pb-12 md:pb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-display md:text-3xl">
              Vehículos relacionados
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {relatedVehicles.map((item) => (
              <Link
                key={item.id}
                href={`/vehiculos/${item.id}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.coverImage ? (
                    <Image
                      src={item.coverImage.url}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <p className="mb-1 text-sm uppercase text-muted-foreground">
                    {dealership.name}
                  </p>
                  <h3 className="mb-2 text-lg font-semibold">{item.name}</h3>
                  <p className="font-bold text-primary">
                    {formatPublicPrice(item.publicPrice, item.currency)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}
