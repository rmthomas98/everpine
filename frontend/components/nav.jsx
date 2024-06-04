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
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { ThemedIconLogo } from "@/components/themedIconLogo";
import { FiBarChart2, FiLink2 } from "react-icons/fi";
import { HiMiniQrCode } from "react-icons/hi2";
import {
  BiBarChart,
  BiBarChartAlt,
  BiBarChartAlt2,
  BiBuilding,
  BiBuildings,
  BiGroup,
  BiHome,
  BiLink,
  BiLinkAlt,
  BiPackage,
  BiRocket,
  BiUserVoice,
} from "react-icons/bi";
import useWindowScroll from "@react-hook/window-scroll";
import { IconRocket } from "@tabler/icons-react";
import { TbBuildingSkyscraper } from "react-icons/tb";

const showNavRoutes = ["/", "/pricing"];

export const Nav = () => {
  const path = usePathname();
  const scrollPosition = useWindowScroll();

  if (!showNavRoutes.includes(path)) return <div></div>;

  return (
    <>
      {/*<Button*/}
      {/*  onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}*/}
      {/*>*/}
      {/*  Light*/}
      {/*</Button>*/}
      <div className={`px-4 py-3 top-0 z-[9999] sticky`}>
        <div
          className={`w-full rounded-full max-w-[1000px] mx-auto flex justify-between items-center px-2 py-2 border bg-background/80 backdrop-blur opacity-0 fade-in-short-delayed ${
            scrollPosition > 50 && "shadow"
          } transition-all`}
        >
          <Link href="/" passHref>
            <ThemedLogo />
          </Link>
          <div className="absolute left-[50%] translate-x-[-50%]">
            <NavigationMenu delayDuration={100}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-auto">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 grid-cols-[.75fr_1fr]">
                      <li className="row-span-3">
                        <div className="p-[1px] relative rounded-[7px] bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 background-animate">
                          <Card className="w-[190px] flex h-full flex-col justify-end p-4 rounded-md no-underline outline-none shadow-none border-none bg-background/90">
                            <ThemedIconLogo />
                            <div className="mb-2 mt-4 font-medium">
                              Dreamist AI
                            </div>
                            <p className="text-[13px] leading-tight">
                              Bring your QR codes to life with the power of AI.
                            </p>
                          </Card>
                        </div>
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
                        icon={<BiLinkAlt size={16} />}
                      >
                        Short, branded links
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
                    <div className="p-4">
                      <div className="font-medium text-xs text-muted-foreground">
                        By stage
                      </div>
                      <ul className="grid grid-cols-[1fr_1fr] mt-4 border-b border-dashed pb-4">
                        <ListItem
                          className="ml-0"
                          href="/startups"
                          title="Startups"
                          icon={<BiRocket size={16} />}
                        >
                          Accelerate growth
                        </ListItem>
                        <ListItem
                          className="ml-0"
                          href="/startups"
                          title="Small business"
                          icon={<BiHome />}
                        >
                          Boost sales
                        </ListItem>
                        <ListItem
                          className="ml-0 mt-4"
                          href="/startups"
                          title="Midmarket"
                          icon={<BiBuildings />}
                        >
                          Drive innovation
                        </ListItem>
                        <ListItem
                          className="ml-0 mt-4"
                          href="/startups"
                          title="Enterprise"
                          icon={<TbBuildingSkyscraper />}
                        >
                          Scale operations
                        </ListItem>
                      </ul>
                      <div className="font-medium text-xs text-muted-foreground mt-4">
                        Use cases
                      </div>
                      <ul className="grid grid-cols-[1fr_1fr] mt-4">
                        <ListItem
                          className="ml-0"
                          href="/startups"
                          title="Surveys & feedback"
                          icon={<BiUserVoice />}
                        >
                          Accelerate growth
                        </ListItem>
                        <ListItem
                          className="ml-0"
                          href="/startups"
                          title="Product packaging"
                          icon={<BiPackage />}
                        >
                          Boost sales
                        </ListItem>
                        <ListItem
                          className="ml-0 mt-4"
                          href="/startups"
                          title="Print marketing"
                          icon={<BiBuilding />}
                        >
                          Drive innovation
                        </ListItem>
                        <ListItem
                          className="ml-0 mt-4"
                          href="/startups"
                          title="Digital marketing"
                          icon={<BiBuilding />}
                        >
                          Scale operations
                        </ListItem>
                        <ListItem
                          className="ml-0 mt-4"
                          href="/startups"
                          title="Content sharing"
                          icon={<BiBuilding />}
                        >
                          Scale operations
                        </ListItem>
                        <ListItem
                          className="ml-0 mt-4"
                          href="/startups"
                          title="Events & conferences"
                          icon={<BiBuilding />}
                        >
                          Scale operations
                        </ListItem>
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-auto">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4">
                      <div className="font-medium text-xs text-muted-foreground">
                        Company
                      </div>
                      <ul className="grid grid-cols-[1fr_1fr] mt-4 border-b border-dashed pb-4">
                        {/*<ul>*/}
                        <ListItem
                          className="ml-0"
                          href="/startups"
                          title="Blog"
                          icon={<BiRocket />}
                        >
                          Accelerate growth
                        </ListItem>
                        <ListItem
                          className="ml-0"
                          href="/startups"
                          title="Contact sales"
                          icon={<BiRocket />}
                        >
                          Accelerate growth
                        </ListItem>
                        <ListItem
                          className="ml-0 mt-4"
                          href="/startups"
                          title="Uptime status"
                          icon={<BiBuilding />}
                        >
                          Uptime status
                        </ListItem>
                        <ListItem
                          className="ml-0 mt-4"
                          href="/startups"
                          title="Changelog"
                          icon={<BiBuilding />}
                        >
                          Careers
                        </ListItem>
                      </ul>
                      <div className="font-medium text-xs text-muted-foreground mt-4">
                        Get started
                      </div>
                      <ul className="grid grid-cols-[1fr_1fr] mt-4">
                        <ListItem
                          className="ml-0"
                          href="/startups"
                          title="Onboarding"
                          icon={<BiBuilding />}
                        >
                          Drive innovation
                        </ListItem>
                        <ListItem
                          className="ml-0"
                          href="/startups"
                          title="Documentation"
                          icon={<BiBuilding />}
                        >
                          Scale operations
                        </ListItem>
                        <ListItem
                          className="mt-4 ml-0"
                          href="/startups"
                          title="Help center"
                          icon={<BiRocket />}
                        >
                          Accelerate growth
                        </ListItem>
                        <ListItem
                          className="mt-4 ml-0"
                          href="/startups"
                          title="Guides"
                          icon={<BiBuilding />}
                        >
                          Boost sales
                        </ListItem>
                      </ul>
                    </div>
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
      </div>
    </>
  );
};

const ListItem = forwardRef(
  ({ className, children, title, icon, ...props }, ref) => (
    <li className="flex items-center">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none w-[250px] group rounded-md ml-2 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="flex items-center space-x-2.5">
            <div className="relative bottom-[1px] h-[34px] w-[34px] border rounded-md flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all">
              {icon}
            </div>
            <div className="h-[33px] flex flex-col justify-between">
              <p className="text-[13px] font-medium leading-none">{title}</p>
              <p className="text-[12px] leading-snug text-muted-foreground group-hover:text-foreground transition-all">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  ),
);
