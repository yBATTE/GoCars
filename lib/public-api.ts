export type PublicVehicleImage = {
  url: string;
  publicId: string;
  order: number;
  isCover: boolean;
};

export type PublicVehicle = {
  id: string;
  dealershipId: string;
  name: string;
  year: number | null;
  kms: number;
  publicPrice: number;
  currency: "ARS" | "USD";
  description: string | null;
  coverImage: PublicVehicleImage | null;
  images: PublicVehicleImage[];
  status: "DRAFT" | "PUBLISHED" | "RESERVED" | "SOLD";
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PublicDealership = {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  whatsapp?: string | null;
};

type PublicBusiness = {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  contactPhone: string | null;
  publicEmail: string | null;
};

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
  business: PublicBusiness;
  products: PublicProduct[];
};

type PublicVehiclesResponse = {
  dealership: PublicDealership;
  vehicles: PublicVehicle[];
};

type PublicVehicleResponse = {
  dealership: PublicDealership;
  vehicle: PublicVehicle;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.lbcodeworks.com.ar/api";

export const DEALERSHIP_SLUG =
  process.env.NEXT_PUBLIC_DEALERSHIP_SLUG || "go-cars";

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491168058254";

export const INSTAGRAM_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
  "https://www.instagram.com/";

function normalizeStatus(
  status: string,
  isPublished: boolean
): PublicVehicle["status"] {
  switch (status.toLowerCase()) {
    case "sold":
    case "vendido":
      return "SOLD";

    case "reserved":
    case "reservado":
      return "RESERVED";

    case "published":
    case "publicado":
      return "PUBLISHED";

    case "draft":
    case "borrador":
      return "DRAFT";

    default:
      return isPublished ? "PUBLISHED" : "DRAFT";
  }
}

function normalizeProduct(product: PublicProduct): PublicVehicle {
  return {
    id: product.id,
    dealershipId: product.businessId,
    name: product.name,
    year: product.vehicleDetails?.year ?? null,
    kms: product.vehicleDetails?.kms ?? 0,
    publicPrice: product.salePrice,
    currency: product.currency,
    description: product.description?.trim() || null,
    coverImage: product.coverImage ?? null,
    images: Array.isArray(product.images) ? product.images : [],
    status: normalizeStatus(product.status, product.isPublished),
    isPublished: product.isPublished,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

function normalizeDealership(
  business: PublicBusiness
): PublicDealership {
  return {
    id: business.id,
    name: business.name,
    slug: business.slug,
    logoUrl: business.logoUrl,
    whatsapp: business.contactPhone,
  };
}

export async function getPublicVehicles(): Promise<PublicVehiclesResponse> {
  const response = await fetch(
    `${API_BASE_URL}/public/${DEALERSHIP_SLUG}/products`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `No se pudieron cargar los vehículos públicos. Código: ${response.status}`
    );
  }

  const data = (await response.json()) as PublicProductsResponse;

  return {
    dealership: normalizeDealership(data.business),
    vehicles: (data.products ?? [])
      .filter(
        (product) =>
          product.productType === "auto" &&
          product.isPublished
      )
      .map(normalizeProduct),
  };
}

export async function getPublicVehicle(
  vehicleId: string
): Promise<PublicVehicleResponse> {
  const data = await getPublicVehicles();

  const vehicle = data.vehicles.find(
    (item) => item.id === vehicleId
  );

  if (!vehicle) {
    throw new Error("No se pudo encontrar el vehículo");
  }

  return {
    dealership: data.dealership,
    vehicle,
  };
}

export function formatPublicPrice(
  amount: number,
  currency: "ARS" | "USD"
) {
  const formattedAmount = new Intl.NumberFormat("es-AR", {
    maximumFractionDigits: 0,
  }).format(amount);

  return currency === "USD"
    ? `US$ ${formattedAmount}`
    : `$ ${formattedAmount}`;
}

export function formatPublicKm(kms: number) {
  return `${new Intl.NumberFormat("es-AR").format(kms)} km`;
}