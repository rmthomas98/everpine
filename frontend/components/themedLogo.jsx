"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

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

  if (!mounted) return <div></div>;

  return (
    <div className="h-[24.9px] max-h-[24.9px] w-[100px] max-w-[100px]">
      <Image
        src={src}
        width={isDashboard ? 90 : 100}
        height={isDashboard ? 24 : 26}
        quality={100}
        alt="dreamist"
        loading="eager"
      />
    </div>
  );
};
