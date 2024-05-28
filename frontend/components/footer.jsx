"use client";

import { usePathname } from "next/navigation";
import { ThemedLogo } from "@/components/ThemedLogo";

const showNavRoutes = ["/", "/pricing"];

export const Footer = () => {
  const path = usePathname();

  if (!showNavRoutes.includes(path)) return <div></div>;

  return (
    <div className="border-t px-4 py-8 fade-in-short-delayed opacity-0">
      <div className="max-w-[1000px] mx-auto flex justify-between">
        <div>
          <ThemedLogo />
          <p className="text-sm mt-4 text-muted-foreground">
            Bring your QR codes to life
          </p>
        </div>
        {/*  <div className="flex items-center space-x-6">*/}
        {/*    <p className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-all">*/}
        {/*      Products*/}
        {/*    </p>*/}
        {/*    <p className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all">*/}
        {/*      Solutions*/}
        {/*    </p>*/}
        {/*    <p className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all">*/}
        {/*      Pricing*/}
        {/*    </p>*/}
        {/*    <p className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all">*/}
        {/*      Resources*/}
        {/*    </p>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
