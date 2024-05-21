"use client";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"), { ssr: false });

export const ThemedLogo = ({ isDashboard }) => {
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
        width={isDashboard ? 90 : 100}
        height={isDashboard ? 24 : 26}
        quality={100}
        alt="dreamist logo"
        loading="eager"
      />
    </div>
  );
};
