"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function DynamicImage({ src, alt, width = 300, height = 300 }) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);
  return (
    <div className="relative aspect-square w-full h-auto flex items-center justify-center bg-gray-200 p-4">
      {isLoaded ? (
        <Image src={src} alt={alt} width={width} height={height} />
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}
