"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  FiBarChart2,
  FiHome,
  FiLink2,
  FiPlus,
  FiZap,
  FiUsers,
} from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { usePathname } from "next/navigation";
import { ThemedLogo } from "@/components/ThemedLogo";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const SideNav = ({ role }) => {
  console.log(role);
  const path = usePathname();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <div
        style={{ marginLeft: "-100%", paddingLeft: "100%" }}
        className="border-r border-transparent"
      >
        <div
          className={`py-3 px-4 h-[100vh] flex justify-end w-[242px] overflow-y-auto`}
        ></div>
      </div>
    );

  return (
    <div
      style={{ marginLeft: "-100%", paddingLeft: "100%" }}
      className={`border-r fade-in-short-delayed opacity-0 ${
        resolvedTheme === "dark" ? "bg-neutral-900" : "bg-neutral-50"
      }`}
    >
      <div
        className={`py-3 px-4 h-[100vh] flex flex-col justify-between w-[242px] overflow-y-auto`}
      >
        <div className="w-full">
          <Link href="/dashboard" passHref>
            {/*<Image*/}
            {/*  src="/images/logos/full-dark-text.png"*/}
            {/*  width={100}*/}
            {/*  height={24}*/}
            {/*  quality={100}*/}
            {/*  alt="Charmify"*/}
            {/*/>*/}
            {/*<Link href="/" passHref>*/}
            {/*<p className="font-semibold text-neutral-900">dreamist</p>*/}
            <ThemedLogo isDashboard={true} />
            {/*</Link>*/}
          </Link>
          <div className="mt-7">
            {role !== "READ_ONLY" ? (
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full justify-start" size="sm">
                    <FiPlus
                      size={15}
                      className="mr-2 relative bottom-[0.5px]"
                    />
                    Create new
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  side="right"
                  onCloseAutoFocus={(e) => e.preventDefault()}
                >
                  <DropdownMenuLabel className="py-1">
                    {/*<p className="text-[13px]">Create new</p>*/}
                    <p className="text-xs text-muted-foreground">Create new</p>
                  </DropdownMenuLabel>
                  {/*<DropdownMenuSeparator />*/}
                  <DropdownMenuItem>
                    <FiZap size={14} className="mr-2" />
                    QR Code
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FiLink2 size={14} className="mr-2 -rotate-45" />
                    Link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              ""
            )}
            <div className="mt-7 pb-7">
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className={`w-full justify-start hover:accent-background ${
                    path === "/dashboard"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-muted-foreground"
                  }`}
                  size="sm"
                >
                  <Link href="/dashboard" passHref>
                    <FiHome
                      size={14}
                      className="mr-2.5 relative bottom-[1px]"
                    />
                    Home
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className={`w-full justify-start hover:accent-background ${
                    path === "/dashboard/links"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-muted-foreground"
                  }`}
                  size="sm"
                >
                  <Link href="/dashboard/links" passHref>
                    <FiLink2
                      size={14}
                      className="mr-2.5 relative bottom-[1px] -rotate-45"
                    />
                    Links
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className={`w-full justify-start hover:accent-background ${
                    path === "/dashboard/qr"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-muted-foreground"
                  }`}
                  size="sm"
                >
                  <Link href="/dashboard/qr" passHref>
                    <FiZap size={14} className="mr-2.5 relative bottom-[1px]" />
                    QR Codes
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className={`w-full justify-start hover:accent-background ${
                    path === "/dashboard/analytics"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-muted-foreground"
                  }`}
                  size="sm"
                >
                  <Link href="/dashboard/analytics" passHref>
                    <FiBarChart2
                      size={14}
                      className="mr-2.5 relative bottom-[1px]"
                    />
                    Analytics
                  </Link>
                </Button>
              </div>
              {role === "SUPER_ADMIN" || role === "ADMIN" ? (
                <div>
                  <Button
                    asChild
                    variant="ghost"
                    className={`w-full justify-start hover:accent-background ${
                      path === "/dashboard/team"
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-muted-foreground"
                    }`}
                    size="sm"
                  >
                    <Link href="/dashboard/team" passHref>
                      <FiUsers
                        size={14}
                        className="mr-2.5 relative bottom-[1px]"
                      />
                      My Team
                    </Link>
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <Button size="sm" variant="outline" className="min-h-8">
          teams
        </Button>
      </div>
    </div>
  );
};
