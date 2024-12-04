import React, { useEffect, useState } from "react";
import { forwardRef } from "react";

import styles from "./styles.module.css";
import { useDebounce } from "@/lib/utils";

type InputProps = {
  placeholder?: string;
  onChange?: (e: GeoApiProps) => void;
  className?: string;
  type?: string;
};

export const PlacesInput = ({
  placeholder,
  onChange,
  className,
  type = "text",
  ...props
}: InputProps) => {
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 500);
  const [locations, setLocations] = useState<GeoApiProps[]>([]);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${debounceSearch}&filter=pk&format=json&apiKey=${process.env.NEXT_PUBLIC_GEO_API}`
        );
        const data: GeoApiResultProps = await response.json();
        setLocations(data.results as GeoApiProps[]);
        setDropdown(data.results.length > 0);
      } catch (error) {
        console.error(error);
      }
    };
    if (debounceSearch && dropdown && search !== "") fetchData();
  }, [debounceSearch]);

  return (
    <div className="relative">
      <input
        className={`${styles.input} ${className}`}
        placeholder={placeholder}
        value={search}
        type={type}
        onChange={(e) => {
          setDropdown(true);
          setSearch(e.target.value);
        }}
        {...props}
      />
      {dropdown && (
        <div className="absolute z-10 w-full bg-white shadow-lg rounded-b-lg">
          {locations.map((location) => (
            <div
              key={location.formatted}
              className="p-2 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSearch(location.formatted);
                setDropdown(false);
                if (onChange) onChange(location);
              }}
            >
              {location.formatted}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
