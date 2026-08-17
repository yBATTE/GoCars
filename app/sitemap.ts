import type { MetadataRoute } from "next";

import { getPublicVehicles } from "@/lib/public-api";

const BASE_URL = "https://gocarscanning.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const homePage: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  try {
    const { vehicles } = await getPublicVehicles();

    const vehiclePages: MetadataRoute.Sitemap = vehicles.map((vehicle) => ({
      url: `${BASE_URL}/vehiculos/${vehicle.id}`,
      lastModified: vehicle.updatedAt
        ? new Date(vehicle.updatedAt)
        : new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    }));

    return [...homePage, ...vehiclePages];
  } catch (error) {
    console.error("No se pudieron agregar los vehículos al sitemap:", error);

    return homePage;
  }
}