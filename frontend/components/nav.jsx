"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const Image = dynamic(() => import("next/image"), { ssr: false });

export const Nav = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <>
      {/*<Button*/}
      {/*  onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}*/}
      {/*>*/}
      {/*  Light*/}
      {/*</Button>*/}
      <nav className="px-4 py-3 sticky top-0">
        <div className="w-full fade-in-delayed opacity-0 rounded-full max-w-[800px] mx-auto flex justify-between backdrop-blur items-center px-2 py-2 border shadow-md">
          <Image
            src={`/images/logos/logo-${resolvedTheme}-mode.svg`}
            width={100}
            height={26}
            alt="dreamist logo"
            quality={100}
          />
          <div className="flex items-center space-x-4 absolute left-[50%] translate-x-[-50%]">
            <p className="text-sm">Features</p>
            <p className="text-sm">Benefits</p>
            <p className="text-sm">Pricing</p>
            <p className="text-sm">Resources</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="rounded-full">
              Sign in
            </Button>
            <Button size="sm" className="rounded-full">
              Get started
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};
