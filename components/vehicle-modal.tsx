"use client";

import { Vehicle, formatPrice, formatKm } from "@/lib/vehicles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { MessageCircle, Calendar, Gauge, Fuel, Settings, CreditCard, RefreshCw, X } from "lucide-react";
import Image from "next/image";

interface VehicleModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "5491168058254";

export function VehicleModal({ vehicle, isOpen, onClose }: VehicleModalProps) {
  if (!vehicle) return null;

  const whatsappMessage = `Hola, me interesa el ${vehicle.marca} ${vehicle.modelo} ${vehicle.año} publicado en GO! CARS. ¿Podrían darme más información?`;
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const financingMessage = `Hola, me interesa financiar el ${vehicle.marca} ${vehicle.modelo} ${vehicle.año}. ¿Qué opciones de financiación tienen disponibles?`;
  const financingUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(financingMessage)}`;

  const consignmentMessage = `Hola, me gustaría dejar mi vehículo en consignación. ¿Cómo es el proceso?`;
  const consignmentUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(consignmentMessage)}`;

  const specs = [
    { icon: Calendar, label: "Año", value: vehicle.año.toString() },
    { icon: Gauge, label: "Kilometraje", value: formatKm(vehicle.kilometraje) },
    { icon: Settings, label: "Transmisión", value: vehicle.transmision },
    { icon: Fuel, label: "Combustible", value: vehicle.combustible },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-border p-0" showCloseButton={false}>
        <DialogClose className="absolute right-4 top-4 z-10 rounded-full bg-background/80 p-2 backdrop-blur-sm hover:bg-background transition-colors">
          <X className="h-4 w-4" />
          <span className="sr-only">Cerrar</span>
        </DialogClose>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative aspect-square md:aspect-auto md:min-h-[500px]">
            <Image
              src={vehicle.imagen}
              alt={`${vehicle.marca} ${vehicle.modelo}`}
              fill
              className="object-cover"
            />
            <Badge
              className={`absolute top-4 left-4 ${
                vehicle.condicion === "0km"
                  ? "bg-primary text-white"
                  : "bg-secondary text-foreground"
              }`}
            >
              {vehicle.condicion === "0km" ? "0 KM" : "Usado"}
            </Badge>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            <DialogHeader className="text-left mb-6">
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide mb-1 font-display">
                {vehicle.marca}
              </p>
              <DialogTitle className="text-2xl md:text-3xl font-bold text-foreground font-display">
                {vehicle.modelo}
              </DialogTitle>
            </DialogHeader>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl md:text-4xl font-bold text-primary font-display">
                {formatPrice(vehicle.precio)}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                >
                  <spec.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">{spec.label}</p>
                    <p className="text-sm font-semibold text-foreground font-display">{spec.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-foreground mb-2 font-display uppercase tracking-wide">Descripción</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {vehicle.descripcion}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-6 text-base"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Consultar por WhatsApp
                </a>
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/30 hover:border-primary hover:bg-primary/10 text-foreground"
                >
                  <a href={financingUrl} target="_blank" rel="noopener noreferrer">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Financiar
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-primary/30 hover:border-primary hover:bg-primary/10 text-foreground"
                >
                  <a href={consignmentUrl} target="_blank" rel="noopener noreferrer">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Consignar
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
