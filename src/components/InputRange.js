"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function InputRange({ min, max }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [value, setValue] = useState(max);

  const onChange = () => {
    const url = new URL(window.location);
    if (value === max) {
      url.searchParams.delete("price");
    } else {
      url.searchParams.set("price", value);
    }
    router.push(url.toString(), { shallow: true });
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      onChange(value);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [value, onChange]);

  useEffect(() => {
    const url = new URL(window.location);
    const price = url.searchParams.get("price");
    if (price !== null) {
      setValue(Number(price));
    }
  }, []);

  const url = [pathname, searchParams].filter((i) => i).join("?");
  useEffect(() => {
    const url = new URL(window.location);
    const price = url.searchParams.get("price");
    if (!price) {
      setValue(max);
    }
  }, [url]);

  const handleChange = (event) => {
    setValue(Number(event.target.value));
  };

  return (
    <div className="grid gap-2 grid-cols-2">
      <p className="col-span-2">Value: {value}</p>
      <input
        id="filterPrice"
        className="col-span-2"
        type="range"
        min={min}
        max={max}
        step="1"
        value={value}
        onChange={handleChange}
      />
      <p className="text-left">{min}</p>
      <p className="text-right">{max}</p>
    </div>
  );
}
