"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Loader2,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { VehicleCard } from "@/components/vehicle-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type {
  PublicVehicle,
  PublicVehicleImage,
} from "@/lib/public-api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.lbcodeworks.com.ar/api";

const DEALERSHIP_SLUG =
  process.env.NEXT_PUBLIC_DEALERSHIP_SLUG ||
  "go-cars";

type ProductVehicleDetails = {
  brand?: string | null;
  model?: string | null;
  version?: string | null;
  year?: number | null;
  kms?: number | null;
  fuelType?: string | null;
  transmission?: string | null;
  color?: string | null;
  plate?: string | null;
};

type PublicProduct = {
  id: string;
  businessId: string;
  name: string;
  slug: string;
  productType: string;
  description: string | null;
  salePrice: number;
  currency: "ARS" | "USD";
  stock: number;
  category: string | null;
  tags: string[];
  coverImage: PublicVehicleImage | null;
  images: PublicVehicleImage[];
  vehicleDetails: ProductVehicleDetails | null;
  status: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

type PublicProductsResponse = {
  business: {
    id: string;
    name: string;
    slug: string;
    logoUrl: string | null;
    contactPhone: string | null;
    publicEmail: string | null;
  };
  products: PublicProduct[];
};

function normalizeStatus(
  status: string,
  isPublished: boolean
): PublicVehicle["status"] {
  const normalizedStatus = status
    .trim()
    .toLowerCase();

  if (
    normalizedStatus === "sold" ||
    normalizedStatus === "vendido"
  ) {
    return "SOLD";
  }

  if (
    normalizedStatus === "reserved" ||
    normalizedStatus === "reservado"
  ) {
    return "RESERVED";
  }

  if (
    normalizedStatus === "published" ||
    normalizedStatus === "publicado"
  ) {
    return "PUBLISHED";
  }

  return isPublished ? "PUBLISHED" : "DRAFT";
}

function normalizeProduct(
  product: PublicProduct
): PublicVehicle {
  return {
    id: product.id,
    dealershipId: product.businessId,
    name: product.name,
    year: product.vehicleDetails?.year ?? null,
    kms: product.vehicleDetails?.kms ?? 0,
    publicPrice: product.salePrice ?? 0,
    currency: product.currency,
    description:
      product.description?.trim() || null,
    coverImage: product.coverImage ?? null,
    images: Array.isArray(product.images)
      ? product.images
      : [],
    status: normalizeStatus(
      product.status,
      product.isPublished
    ),
    isPublished: product.isPublished,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

function getBrandFromName(name: string) {
  return (
    name.trim().split(/\s+/)[0] ||
    "Sin marca"
  );
}

export function Catalog() {
  const [vehicles, setVehicles] = useState<
    PublicVehicle[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedMarca, setSelectedMarca] =
    useState("all");

  const [
    selectedCurrency,
    setSelectedCurrency,
  ] = useState("all");

  const [selectedYear, setSelectedYear] =
    useState("all");

  const [showFilters, setShowFilters] =
    useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadVehicles() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_BASE_URL}/public/${DEALERSHIP_SLUG}/products`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            `No se pudieron cargar los vehículos. Código: ${response.status}`
          );
        }

        const data =
          (await response.json()) as PublicProductsResponse;

        const products = Array.isArray(
          data?.products
        )
          ? data.products
          : [];

        const normalizedVehicles = products
          .filter((product) => {
            const isVehicle =
              product.productType
                ?.trim()
                .toLowerCase() === "auto";

            const isPublished =
              product.isPublished ||
              product.status
                ?.trim()
                .toLowerCase() ===
                "published";

            return isVehicle && isPublished;
          })
          .map(normalizeProduct);

        setVehicles(normalizedVehicles);
      } catch (err) {
        if (
          err instanceof DOMException &&
          err.name === "AbortError"
        ) {
          return;
        }

        console.error(
          "Error cargando vehículos:",
          err
        );

        setError(
          "No se pudieron cargar los vehículos publicados."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadVehicles();

    return () => {
      controller.abort();
    };
  }, []);

  const marcas = useMemo(() => {
    const uniqueBrands = [
      ...new Set(
        vehicles.map((vehicle) =>
          getBrandFromName(vehicle.name)
        )
      ),
    ];

    return uniqueBrands.sort((a, b) =>
      a.localeCompare(b, "es")
    );
  }, [vehicles]);

  const years = useMemo(() => {
    const uniqueYears = [
      ...new Set(
        vehicles
          .map((vehicle) => vehicle.year)
          .filter(
            (year): year is number =>
              typeof year === "number"
          )
      ),
    ];

    return uniqueYears.sort(
      (a, b) => b - a
    );
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    const normalizedSearch = searchQuery
      .trim()
      .toLowerCase();

    return vehicles.filter((vehicle) => {
      const brand = getBrandFromName(
        vehicle.name
      );

      const matchesSearch =
        normalizedSearch === "" ||
        vehicle.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        brand
          .toLowerCase()
          .includes(normalizedSearch) ||
        String(vehicle.year ?? "").includes(
          normalizedSearch
        );

      const matchesMarca =
        selectedMarca === "all" ||
        brand === selectedMarca;

      const matchesCurrency =
        selectedCurrency === "all" ||
        vehicle.currency ===
          selectedCurrency;

      const matchesYear =
        selectedYear === "all" ||
        String(vehicle.year ?? "") ===
          selectedYear;

      return (
        matchesSearch &&
        matchesMarca &&
        matchesCurrency &&
        matchesYear
      );
    });
  }, [
    vehicles,
    searchQuery,
    selectedMarca,
    selectedCurrency,
    selectedYear,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedMarca("all");
    setSelectedCurrency("all");
    setSelectedYear("all");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedMarca !== "all" ||
    selectedCurrency !== "all" ||
    selectedYear !== "all";

  return (
    <section
      id="catalogo"
      className="scroll-mt-20 bg-[#050505] py-20 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white md:text-5xl lg:text-6xl">
            Explorá nuestro catálogo
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/55 md:text-lg">
            Vehículos seleccionados,
            revisados y listos para entregar.
            Encontrá el auto que estás
            buscando.
          </p>
        </div>

        <div className="mx-auto mb-10 max-w-6xl">
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" />

              <Input
                type="search"
                placeholder="Buscar por marca o modelo..."
                value={searchQuery}
                onChange={(event) =>
                  setSearchQuery(
                    event.target.value
                  )
                }
                className="h-14 rounded-lg border-white/15 bg-[#0d0d0d] pl-14 pr-4 text-base text-white shadow-none placeholder:text-white/45 focus-visible:border-[#e30613] focus-visible:ring-[#e30613]/30"
              />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setShowFilters(
                  (current) => !current
                )
              }
              className={`h-14 min-w-32 rounded-lg px-6 font-display text-base font-semibold text-white transition-colors ${
                showFilters
                  ? "border-[#e30613] bg-[#e30613] hover:bg-[#bd0510]"
                  : "border-white/15 bg-[#0d0d0d] hover:border-[#e30613] hover:bg-[#160305]"
              }`}
            >
              <SlidersHorizontal className="mr-2 h-5 w-5" />
              Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl border border-white/10 bg-[#0d0d0d] p-4 sm:grid-cols-3">
              <Select
                value={selectedMarca}
                onValueChange={
                  setSelectedMarca
                }
              >
                <SelectTrigger className="h-12 border-white/10 bg-[#151515] text-white">
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    Todas las marcas
                  </SelectItem>

                  {marcas.map((marca) => (
                    <SelectItem
                      key={marca}
                      value={marca}
                    >
                      {marca}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedCurrency}
                onValueChange={
                  setSelectedCurrency
                }
              >
                <SelectTrigger className="h-12 border-white/10 bg-[#151515] text-white">
                  <SelectValue placeholder="Moneda" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    Todas las monedas
                  </SelectItem>

                  <SelectItem value="ARS">
                    Pesos argentinos
                  </SelectItem>

                  <SelectItem value="USD">
                    Dólares
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedYear}
                onValueChange={
                  setSelectedYear
                }
              >
                <SelectTrigger className="h-12 border-white/10 bg-[#151515] text-white">
                  <SelectValue placeholder="Año" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="all">
                    Todos los años
                  </SelectItem>

                  {years.map((year) => (
                    <SelectItem
                      key={year}
                      value={String(year)}
                    >
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={clearFilters}
                  className="text-white/55 hover:bg-white/5 hover:text-white sm:col-span-3"
                >
                  <X className="mr-2 h-4 w-4" />
                  Limpiar filtros
                </Button>
              )}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex min-h-72 flex-col items-center justify-center gap-4">
            <Loader2 className="h-9 w-9 animate-spin text-[#e30613]" />

            <p className="text-white/50">
              Cargando vehículos...
            </p>
          </div>
        ) : error ? (
          <div className="flex min-h-72 flex-col items-center justify-center text-center">
            <p className="mb-5 font-display text-xl text-white/60">
              {error}
            </p>

            <Button
              type="button"
              onClick={() =>
                window.location.reload()
              }
              className="bg-[#e30613] text-white hover:bg-[#bd0510]"
            >
              Reintentar
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-9 text-center">
              <p className="text-base text-white/55">
                Mostrando{" "}
                <span className="font-display font-semibold text-white">
                  {filteredVehicles.length}
                </span>{" "}
                {filteredVehicles.length === 1
                  ? "vehículo"
                  : "vehículos"}
              </p>
            </div>

            {filteredVehicles.length >
            0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredVehicles.map(
                  (vehicle) => (
                    <VehicleCard
                      key={vehicle.id}
                      vehicle={vehicle}
                    />
                  )
                )}
              </div>
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-white/10 bg-[#0b0b0b] px-4 text-center">
                <p className="mb-5 font-display text-xl text-white/55">
                  No encontramos vehículos con
                  esos criterios
                </p>

                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                  className="border-white/15 bg-transparent text-white hover:border-[#e30613] hover:bg-[#e30613]"
                >
                  Ver todos los vehículos
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}