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
import { Card } from "@/components/ui/card";
import { ThemedIconLogo } from "@/components/themedIconLogo";
import {
  BiBuilding,
  BiBuildings,
  BiDonateHeart,
  BiPackage,
  BiRocket,
  BiShareAlt,
  BiUserVoice,
  BiBeenHere,
  BiWine,
  BiBuildingHouse,
  BiPurchaseTag,
  BiStore,
  BiCapsule,
  BiCollection,
  BiCandles,
  BiIdCard,
  BiPen,
  BiDirections,
  BiCompass,
  BiMapPin,
  BiMap,
  BiMessageSquare,
  BiBriefcase,
  BiWorld,
  BiBookContent,
  BiBookOpen,
  BiBook,
  BiBookAlt,
  BiMapAlt,
  BiQuestionMark,
  BiHelpCircle,
  BiListUl,
  BiTrain,
  BiPlanet,
} from "react-icons/bi";
import useWindowScroll from "@react-hook/window-scroll";
import { IconRocket } from "@tabler/icons-react";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { PiPaintBucketBold } from "react-icons/pi";
import { products } from "@/data/nav/navItems";

const solutions = {
  stages: [
    {
      title: "Startups",
      description: "Accelerate growth",
      icon: <BiRocket />,
      href: "/stages/startups",
    },
    {
      title: "Small business",
      description: "Connect with customers",
      icon: <BiStore />,
      href: "/stages/small-business",
    },
    {
      title: "Midmarket",
      description: "Drive innovation",
      icon: <BiBuildings />,
      href: "/stages/midmarket",
    },
    {
      title: "Enterprise",
      description: "Scale operations",
      icon: <TbBuildingSkyscraper />,
      href: "/stages/enterprise",
    },
  ],
  industries: [
    {
      title: "Restaurants",
      description: "Redefine dining experiences",
      icon: <BiWine />,
      href: "/industries/hospitality",
    },
    {
      title: "Retail",
      description: "Keep customers coming back",
      icon: <BiPurchaseTag />,
      href: "/industries/retail",
    },
    {
      title: "Real estate",
      description: "Streamline property information",
      icon: <BiBuildingHouse />,
      href: "/industries/real-estate",
    },
    {
      title: "Education",
      description: "Educate quickly and effectively",
      icon: <BiCollection />,
      href: "/industries/charity",
    },
    {
      title: "Healthcare",
      description: "Improve patient care",
      icon: <BiCapsule />,
      href: "/industries/real-estate",
    },
    {
      title: "Financial services",
      description: "Lead with trust and security",
      icon: <BiCandles />,
      href: "/industries/charity",
    },
  ],
};

const useCases = [
  {
    title: "Surveys & feedback",
    description: "Get insights from customers",
    icon: <BiUserVoice />,
    href: "/use-cases/surveys-feedback",
  },
  {
    title: "Product packaging",
    description: "Enhance customer experience",
    icon: <BiPackage />,
    href: "/use-cases/product-packaging",
  },
  {
    title: "Content sharing",
    description: "Share photos, videos, and more",
    icon: <BiShareAlt />,
    href: "/use-cases/content-sharing",
  },
  {
    title: "Donations",
    description: "Increase awareness",
    icon: <BiDonateHeart />,
    href: "/use-cases/donations",
  },
  {
    title: "Business cards",
    description: "Tell your story in seconds",
    icon: <BiIdCard />,
    href: "/use-cases/business-cards",
  },
  {
    title: "Live events",
    description: "Give your audience more",
    icon: <BiMap />,
    href: "/use-cases/live-events",
  },
];

const resources = {
  company: [
    {
      title: "Blog",
      description: "Read the latest articles",
      icon: <BiPen />,
      href: "/startups",
    },
    {
      title: "Contact sales",
      description: "Get your tailored solution",
      icon: <BiBriefcase />,
      href: "/startups",
    },
    {
      title: "Uptime status",
      description: "Check the status of our services",
      icon: <BiWorld />,
      href: "/startups",
    },
    {
      title: "Changelog",
      description: "See what's new",
      icon: <BiBookContent />,
      href: "/startups",
    },
  ],
  getStarted: [
    {
      title: "Onboarding",
      description: "Tips to getting started",
      icon: <BiRocket />,
      href: "/startups",
    },
    {
      title: "Documentation",
      description: "Find what you need",
      icon: <BiBookAlt />,
      href: "/startups",
    },
    {
      title: "Guides",
      description: "Step-by-step instructions",
      icon: <BiMapAlt />,
      href: "/pricing",
    },
    {
      title: "Help center",
      description: "Get answers to your questions",
      icon: <BiHelpCircle />,
      href: "/startups",
    },
  ],
};

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
          className={`w-full rounded-full max-w-[1100px] mx-auto flex justify-between items-center px-2 py-2 border bg-background/80 backdrop-blur opacity-0 fade-in-short-delayed ${
            scrollPosition > 50 && "shadow"
          } transition-all`}
        >
          <div className="ml-1">
            <Link href="/" passHref>
              <ThemedLogo />
            </Link>
          </div>
          <div className="absolute left-[50%] translate-x-[-50%]">
            <NavigationMenu delayDuration={100}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-auto">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-x-4 gap-y-5 p-4 grid-rows-[1fr_1fr_1fr_1fr_1fr] grid-cols-[.75fr_1fr]">
                      <li className="row-span-5">
                        <div className="p-[1px] h-full relative rounded-[7px] bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 background-animate">
                          <Card className="w-[190px] flex h-full flex-col justify-end p-4 rounded-md no-underline outline-none shadow-none border-none bg-background/90">
                            <ThemedIconLogo />
                            <div className="mb-2 mt-3.5 font-medium">
                              Spacemon AI
                            </div>
                            <p className="text-[13px] leading-tight">
                              Bring your QR codes to life with the power of AI.
                            </p>
                          </Card>
                        </div>
                      </li>
                      {products.map((item, i) => (
                        <ListItem
                          key={i}
                          href={item.href}
                          title={item.title}
                          icon={item.icon}
                        >
                          {item.description}
                        </ListItem>
                      ))}
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
                      <ul className="grid gap-5 grid-cols-[1fr_1fr] mt-4 border-b border-dashed pb-4">
                        {solutions.stages.map((item, i) => (
                          <ListItem
                            key={i}
                            href={item.href}
                            title={item.title}
                            icon={item.icon}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                      <div className="flex items-center justify-between w-full mt-4">
                        <p className="font-medium text-xs text-muted-foreground">
                          By industry
                        </p>
                        <MenuButton href="/pricing">Explore all</MenuButton>
                      </div>
                      <ul className="grid gap-5 grid-cols-[1fr_1fr] mt-4">
                        {solutions.industries.map((item, i) => (
                          <ListItem
                            key={i}
                            href={item.href}
                            title={item.title}
                            icon={item.icon}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="cursor-auto">
                    Use cases
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-4">
                      <div className="flex items-center justify-between w-full">
                        <p className="font-medium text-xs text-muted-foreground">
                          Use cases
                        </p>
                        <MenuButton href="/pricing">Explore all</MenuButton>
                      </div>
                      <ul className="grid gap-5 grid-cols-[1fr_1fr] mt-4">
                        {useCases.map((item, i) => (
                          <ListItem
                            key={i}
                            href={item.href}
                            title={item.title}
                            icon={item.icon}
                          >
                            {item.description}
                          </ListItem>
                        ))}
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
                      <ul className="grid gap-5 grid-cols-[1fr_1fr] mt-4 border-b border-dashed pb-4">
                        {/*<ul>*/}
                        {resources.company.map((item, i) => (
                          <ListItem
                            key={i}
                            href={item.href}
                            title={item.title}
                            icon={item.icon}
                          >
                            {item.description}
                          </ListItem>
                        ))}
                      </ul>
                      <div className="font-medium text-xs text-muted-foreground mt-4">
                        Get started
                      </div>
                      <ul className="grid gap-5 grid-cols-[1fr_1fr] mt-4">
                        {resources.getStarted.map((item, i) => (
                          <ListItem
                            key={i}
                            href={item.href}
                            title={item.title}
                            icon={item.icon}
                          >
                            {item.description}
                          </ListItem>
                        ))}
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
              <Link href="/signin">Sign in</Link>
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
        <Link
          ref={ref}
          className={cn(
            "block select-none w-[240px] group rounded-md leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
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
        </Link>
      </NavigationMenuLink>
    </li>
  ),
);

const MenuButton = forwardRef(({ className, children, ...props }, ref) => (
  <NavigationMenuLink asChild>
    <Link ref={ref} className={className} {...props}>
      <Button
        variant="ghost"
        size="sm"
        className="rounded-full h-[22px] px-3 text-xs w-[100px]"
      >
        {children} <HiArrowSmRight className="ml-1" size={12} />
      </Button>
    </Link>
  </NavigationMenuLink>
));
