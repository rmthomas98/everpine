"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiPlanetFill } from "react-icons/pi";

export const ThemedIconLogo = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { resolvedTheme } = useTheme();

  let src;

  switch (resolvedTheme) {
    case "light":
      src = "/images/logos/icon-black.svg";
      break;
    case "dark":
      src = "/images/logos/icon-white.svg";
      break;
    default:
      break;
  }

  if (!mounted) return <div></div>;

  return (
    <div className="h-[30px] max-h-[30px] w-[30px] max-w-[30px]">
      {/*<Image src={src} width={30} height={30} quality={100} alt="dreamist" />*/}
      <PiPlanetFill size={30} />
    </div>
  );
};
