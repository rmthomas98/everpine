"use client";

import { Button } from "@/components/ui/button";
import { HiArrowSmRight } from "react-icons/hi";
import Link from "next/link";
import { ThemedLogo } from "@/components/ThemedLogo";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

const showNavRoutes = ["/", "/pricing"];

export const Nav = () => {
  const path = usePathname();

  if (!showNavRoutes.includes(path)) return <div></div>;

  return (
    <>
      {/*<Button*/}
      {/*  onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}*/}
      {/*>*/}
      {/*  Light*/}
      {/*</Button>*/}
      <nav className="px-4 py-3 sticky top-0 z-[9999]">
        <div
          className={`w-full rounded-full max-w-[1000px] mx-auto flex justify-between backdrop-blur-lg items-center px-2 py-2 border bg-background/60 shadow opacity-0 fade-in-short-delayed`}
        >
          <Link href="/" passHref>
            <ThemedLogo />
          </Link>
          <div className="flex items-center space-x-6 absolute left-[50%] translate-x-[-50%]">
            {/*<p className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-all">*/}
            {/*  Products*/}
            {/*</p>*/}
            {/*<p className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all">*/}
            {/*  Solutions*/}
            {/*</p>*/}
            {/*<p className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all">*/}
            {/*  Pricing*/}
            {/*</p>*/}
            {/*<p className="text-sm text-muted-foreground hover:text-foreground cursor-pointer transition-all">*/}
            {/*  Resources*/}
            {/*</p>*/}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="rounded-full bg-transparent text-[13px] h-8">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="rounded-full bg-transparent text-[13px] h-8">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink>Pricing</NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link href="/login">Sign in</Link>
            </Button>
            <Button size="sm" className="rounded-full" asChild>
              <Link href="/pricing">
                Get started
                <HiArrowSmRight className="ml-1" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};
