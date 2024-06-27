"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PiPlanetFill } from "react-icons/pi";

export const ThemedLogo = ({ isDashboard }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const { resolvedTheme } = useTheme();

  let src;

  switch (resolvedTheme) {
    case "light":
      src = "/images/logos/full-logo-black.svg";
      break;
    case "dark":
      src = "/images/logos/full-logo-white.svg";
      break;
    default:
      break;
  }

  // if (!mounted)
  //   return (
  //     <div className="h-[25px] max-h-[25px] w-[100px] max-w-[100px]"></div>
  //   );

  return (
    <div className="h-[25px] max-h-[25px] w-[100px] max-w-[100px] flex items-center">
      {/*<Image*/}
      {/*  src={src}*/}
      {/*  width={isDashboard ? 90 : 100}*/}
      {/*  height={isDashboard ? 24 : 26}*/}
      {/*  quality={100}*/}
      {/*  alt="dreamist"*/}
      {/*  loading="eager"*/}
      {/*/>*/}
      <PiPlanetFill size={24} />
      <p className="text-[15px] font-medium ml-1.5">airtoken</p>
    </div>
  );
};
