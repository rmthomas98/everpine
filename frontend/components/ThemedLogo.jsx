"use client";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"), { ssr: false });

export const ThemedLogo = () => {
  const { resolvedTheme } = useTheme();

  let src;

  switch (resolvedTheme) {
    case "light":
      src = "/images/logos/logo-light-mode.svg";
      break;
    case "dark":
      src = "/images/logos/logo-dark-mode.svg";
      break;
    default:
      break;
  }

  return (
    <div className="h-[24.9px] max-h-[24.9px] w-[100px] max-w-[100px]">
      <Image
        src={src}
        width={100}
        height={26}
        quality={100}
        alt="dreamist logo dark"
        loading="eager"
      />
    </div>
  );
};
