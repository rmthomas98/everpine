"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Nav = () => {
  return (
    <>
      <div className="h-[63px]"></div>
      <nav className="px-4 py-3 fixed top-0 left-[50%] w-full translate-x-[-50%]">
        <div className="w-full relative rounded-full max-w-[800px] mx-auto flex justify-between items-center px-3 py-2 backdrop-blur bg-zinc-300/20 border border-zinc-200 shadow-md">
          <Image
            src="/images/logos/full-dark-text.svg"
            width={100}
            height={21}
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
