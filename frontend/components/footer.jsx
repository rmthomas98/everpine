"use client";

import { usePathname } from "next/navigation";
import { ThemedLogo } from "@/components/themedLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { FiCheck, FiMoon, FiSave, FiSun } from "react-icons/fi";

const showNavRoutes = ["/", "/pricing"];

const company = [
  // { label: "Press", href: "/press" },
  { label: "Blog", href: "/blog" },
  // { label: "About us", href: "/about" },
  // { label: "Changelog", href: "/changelog" },
  // { label: "Uptime status", href: "/uptime-status" },
];

const products = [
  { label: "AI", href: "/ai" },
  { label: "QR Codes", href: "/qr-codes" },
  { label: "Custom links", href: "/custom-links" },
  { label: "Landing pages", href: "/landing-pages" },
  { label: "Analytics", href: "/analytics" },
];

const resources = [
  { label: "Documentation", href: "/documentation" },
  { label: "Guides", href: "/guides" },
  { label: "Help center", href: "/help" },
  // { label: "FAQs", href: "/faqs" },
  // { label: "Industries", href: "/industries" },
  { label: "Uptime status", href: "/uptime-status" },
  { label: "Changelog", href: "/changelog" },
];

const contact = [
  { label: "Support", href: "/support" },
  { label: "Sales", href: "/sales" },
  { label: "Public relations", href: "/public-relations" },
  { label: "General inquiries", href: "/contact" },
];

const terms = [
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of service", href: "/terms-of-service" },
  { label: "Cookies", href: "/cookies" },
  { label: "Security", href: "/security" },
];

export const Footer = () => {
  const path = usePathname();

  if (!showNavRoutes.includes(path)) return <div></div>;

  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme, setTheme, theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="border-t px-4 py-12 fade-in-short-delayed opacity-0">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex justify-between">
          <div>
            <ThemedLogo />
            <p className="text-[13px] mt-4 text-muted-foreground max-w-[180px]">
              Bring your QR codes to life with the power of AI
            </p>
          </div>
          <div className="flex space-x-12 mt-1">
            <div>
              <p className="text-sm font-medium">Company</p>
              <div className="mt-3 flex flex-col space-y-1">
                {company.map((item, index) => (
                  <Link
                    href={item.href}
                    passHref
                    key={item.label}
                    className="text-muted-foreground text-[13px] hover:text-foreground transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Products</p>
              <div className="mt-3 flex flex-col space-y-1">
                {products.map((item, index) => (
                  <Link
                    href={item.href}
                    passHref
                    key={item.label}
                    className="text-muted-foreground text-[13px] hover:text-foreground transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Resources</p>
              <div className="mt-3 flex flex-col space-y-1">
                {resources.map((item, index) => (
                  <Link
                    href={item.href}
                    passHref
                    key={item.label}
                    className="text-muted-foreground text-[13px] hover:text-foreground transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Contact us</p>
              <div className="mt-3 flex flex-col space-y-1">
                {contact.map((item, index) => (
                  <Link
                    href={item.href}
                    passHref
                    key={item.label}
                    className="text-muted-foreground text-[13px] hover:text-foreground transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Terms</p>
              <div className="mt-3 flex flex-col space-y-1">
                {terms.map((item, index) => (
                  <Link
                    href={item.href}
                    passHref
                    key={item.label}
                    className="text-muted-foreground text-[13px] hover:text-foreground transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © 2024 Spacemon. All rights reserved.
          </p>
          {isMounted && (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex w-[120px] justify-between"
                >
                  {theme === "dark" ? (
                    <span className="flex items-center">
                      <FiMoon className="mr-2" />
                      <span>Dark</span>
                    </span>
                  ) : theme === "light" ? (
                    <span className="flex items-center">
                      <FiSun className="mr-2" />
                      <span>Light</span>
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <FiSave className="mr-2" />
                      <span>System</span>
                    </span>
                  )}
                  <HiMiniChevronUpDown className="text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[120px] min-w-[120px]">
                <DropdownMenuItem
                  className="flex justify-between items-center"
                  onSelect={() => setTheme("light")}
                >
                  <div className="flex items-center">
                    <FiSun className="mr-2" />
                    <span>Light</span>
                  </div>
                  {theme === "light" && <FiCheck />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between items-center"
                  onSelect={() => setTheme("dark")}
                >
                  <div className="flex items-center">
                    <FiMoon className="mr-2" />
                    <span>Dark</span>
                  </div>
                  {theme === "dark" && <FiCheck />}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex justify-between items-center"
                  onSelect={() => setTheme("system")}
                >
                  <div className="flex items-center">
                    <FiSave className="mr-2" />
                    <span>System</span>
                  </div>
                  {theme === "system" && <FiCheck />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </div>
  );
};
