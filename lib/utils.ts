import { clsx, type ClassValue } from "clsx";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
export const calculateTotalCost = async ({
  pickupLocation,
  dropoffLocation,
}: {
  pickupLocation: GeoApiProps;
  dropoffLocation: GeoApiProps;
}) => {
  try {
    const responsePickUpDropOff = await fetch(
      `https://api.geoapify.com/v1/routing?waypoints=${pickupLocation.lat},${pickupLocation.lon}|${dropoffLocation.lat},${dropoffLocation.lon}&mode=drive&apiKey=${process.env.NEXT_PUBLIC_GEO_API}`
    );
    const dataToUser = await responsePickUpDropOff.json();
    const distanceToUser = dataToUser.features[0].properties.distance;
    const price = (distanceToUser * 15) / 1000;
    return price.toFixed(0);
  } catch (error) {
    console.error("Error calculating driver times:", error);
  }
};

export const scrolltoHash = function (element_id: string) {
  let yOffset;

  if (window.innerWidth < 1535) {
    yOffset = -65;
  } else {
    yOffset = -105;
  }

  const element = document.getElementById(element_id);
  if (element) {
    const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};