"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Calendar, Gauge, Eye } from "lucide-react";

import {
  type PublicVehicle,
  WHATSAPP_NUMBER,
  formatPublicKm,
  formatPublicPrice,
} from "@/lib/public-api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface VehicleCardProps {
  vehicle: PublicVehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const whatsappMessage = `Hola Go Cars, quiero información sobre el ${vehicle.name}${
    vehicle.year ? ` ${vehicle.year}` : ""
  } con ${formatPublicKm(vehicle.kms)}, publicado a ${formatPublicPrice(
    vehicle.publicPrice,
    vehicle.currency,
  )}.`;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage,
  )}`;

  const detailHref = `/vehiculos/${vehicle.id}`;
  const brand = vehicle.name.trim().split(" ")[0] || "Vehículo";

  return (
    <Card className="group overflow-hidden border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative aspect-[4/3] overflow-hidden">
        {vehicle.coverImage ? (
          <Image
            src={vehicle.coverImage.url}
            alt={vehicle.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground">
            Sin imagen
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
          {vehicle.currency}
        </Badge>

        <Button
          asChild
          size="sm"
          variant="secondary"
          className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <Link href={detailHref}>
            <Eye className="mr-1 h-4 w-4" />
            Ver más
          </Link>
        </Button>
      </div>

      <CardContent className="p-5">
        <div className="mb-3">
          <p className="mb-1 font-display text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {brand}
          </p>
          <h3 className="line-clamp-1 font-display text-lg font-bold text-foreground">
            {vehicle.name}
          </h3>
        </div>

        <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{vehicle.year ?? "—"}</span>
          </div>

          <div className="flex items-center gap-1">
            <Gauge className="h-4 w-4" />
            <span>{formatPublicKm(vehicle.kms)}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="font-display text-2xl font-bold text-primary">
            {formatPublicPrice(vehicle.publicPrice, vehicle.currency)}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            asChild
            className="flex-1 bg-[#25D366] text-white hover:bg-[#128C7E]"
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" />
              Consultar
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="border-border hover:border-primary hover:text-primary"
          >
            <Link href={detailHref}>Detalle</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
