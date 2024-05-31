"use client";

import { Button } from "@/components/ui/button";
import { HiArrowSmRight } from "react-icons/hi";
import Link from "next/link";
import { ThemedLogo } from "@/components/themedLogo";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ThemedIconLogo } from "@/components/themedIconLogo";
import { HiMiniArrowRight } from "react-icons/hi2";
import { FiBarChart2, FiLink2 } from "react-icons/fi";
import { HiMiniQrCode } from "react-icons/hi2";

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
            <NavigationMenu delayDuration={100}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-auto">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <Card className="w-[190px] flex h-full flex-col justify-end p-4 rounded-md no-underline outline-none shadow-none bg-accent">
                          <ThemedIconLogo />
                          <div className="mb-2 mt-4 font-medium">
                            Dreamist AI
                          </div>
                          <p className="text-[13px] leading-tight">
                            Bring your QR codes to life with the power of AI.
                          </p>
                        </Card>
                      </li>
                      <ListItem
                        href="/docs"
                        title="QR Codes"
                        icon={<HiMiniQrCode size={16} />}
                      >
                        Stunning AI-powered QR codes
                      </ListItem>
                      <ListItem
                        href="/docs/installation"
                        title="Custom links"
                        icon={<FiLink2 size={16} className="-rotate-45" />}
                      >
                        Short, custom, branded links
                      </ListItem>
                      <ListItem
                        href="/docs/primitives/typography"
                        title="Analytics"
                        icon={<FiBarChart2 size={16} />}
                      >
                        Detailed analytics and insights
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-auto">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-auto">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing" passHref legacyBehavior>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
              <NavigationMenuIndicator />
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

const ListItem = forwardRef(
  ({ className, children, title, icon, ...props }, ref) => (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none w-[250px] group rounded-md py-2 ml-2 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center space-x-2.5">
            <div className="h-[34px] w-[34px] border rounded-md flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
              {icon}
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[13px] font-medium leading-none">
                  {title}
                </span>
                <HiMiniArrowRight
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0"
                />
              </div>
              <p className="line-clamp-2 text-[13px] leading-snug text-muted-foreground group-hover:text-foreground transition-all">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  ),
);
