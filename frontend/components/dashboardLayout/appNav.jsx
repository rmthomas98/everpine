"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FiHelpCircle,
  FiMessageSquare,
  FiThumbsUp,
  FiLogOut,
  FiSearch,
  FiInfo,
  FiFlag,
  FiSun,
  FiMoon,
  FiSettings,
  FiBell,
  FiCheckCircle,
  FiPlusCircle,
} from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { signOut } from "next-auth/react";
import { ThemedLogo } from "@/components/logo/themedLogo";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const AppNav = ({ user }) => {
  const [isAccountTooltipOpen, setIsAccountTooltipOpen] = useState(false);
  const [isCreateTooltipOpen, setIsCreateTooltipOpen] = useState(false);
  const [isHelpTooltipOpen, setIsHelpTooltipOpen] = useState(false);
  const [isNotifsTooltipOpen, setIsNotifsTooltipOpen] = useState(false);

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [isHelpMenuOpen, setIsHelpMenuOpen] = useState(false);
  const [isNotifsMenuOpen, setIsNotifsMenuOpen] = useState(false);

  const [isAnyMenuOpen, setIsAnyMenuOpen] = useState(false);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();

  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setIsAnyMenuOpen(
      isAccountMenuOpen ||
        isCreateMenuOpen ||
        isHelpMenuOpen ||
        isNotifsMenuOpen,
    );
    return () => setIsAnyMenuOpen(false);
  }, [isAccountMenuOpen, isCreateMenuOpen, isHelpMenuOpen, isNotifsMenuOpen]);

  const ref = useRef(null);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  return (
    <nav
      // style={{ marginRight: "-100vw", paddingRight: "100vw" }}
      className="py-3 backdrop-blur bg-background/80 fade-in-short-delayed opacity-0 sticky z-10 border-b top-0"
    >
      <div className="max-w-[1400px] mx-auto px-4">
        {/*<div className="px-4 py-3">*/}
        <TooltipProvider delayDuration={100}>
          <div
            className="flex justify-between items-center"
            id="nav-container"
            ref={ref}
          >
            <div className="flex items-center w-full relative">
              {/*<div*/}
              {/*  style={{*/}
              {/*    marginLeft: "-100vw",*/}
              {/*    paddingLeft: "100vw",*/}
              {/*  }}*/}
              {/*  className="bg-zinc-50 dark:bg-zinc-900/60 my-[-14.5px] py-[14.5px]"*/}
              {/*>*/}
              <div className="min-w-[226px] flex items-center space-between space-x-2">
                <Link href="/dashboard" passHref>
                  <ThemedLogo isDashboard={true} />
                </Link>
                {/*<Badge*/}
                {/*  className="capitalize dark:font-medium"*/}
                {/*  variant="secondary"*/}
                {/*>*/}
                {/*  {user?.team.plan.toLowerCase()}*/}
                {/*</Badge>*/}
              </div>
              {/*</div>*/}
              <Separator
                orientation="vertical"
                className="h-[55px] -bottom-3 absolute left-[226px] z-10"
              />
              <div className="w-full flex mx-4 max-w-[400px]">
                <DropdownMenu
                  open={isSearchOpen}
                  onOpenChange={(open) => {
                    // if (searchRef.current.contains(document.activeElement)) {
                    //   setIsSearchOpen(open);
                    //   return;
                    // }
                    if (
                      isSearchOpen &&
                      searchRef.current?.contains(document.activeElement)
                    )
                      return;
                    setIsSearchOpen(open);
                    if (open) searchRef.current?.focus();
                  }}
                  modal={false}
                >
                  <DropdownMenuTrigger />
                  <div className="relative w-full">
                    <FiSearch
                      size={13}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                      onFocus={() => setIsSearchOpen(true)}
                      onBlur={(e) => {
                        if (dropdownRef.current?.contains(e.relatedTarget)) {
                          e.target.focus();
                        } else {
                          setIsSearchOpen(false);
                        }
                      }}
                      ref={searchRef}
                      placeholder="Search..."
                      className="h-[30px] pl-8 placeholder:text-[13px] shadow-none"
                    />
                  </div>
                  <DropdownMenuContent
                    align="start"
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    style={{ width: searchRef.current?.offsetWidth }}
                    ref={dropdownRef}
                  >
                    <DropdownMenuLabel>
                      <p className="text-[13px]">Suggested filters</p>
                    </DropdownMenuLabel>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {user.team.plan === "FREE" && user.role === "OWNER" && (
                <Button size="sm" className="h-[30px]" asChild>
                  <Link href="/subscribe?plan=professional" passHref>
                    Upgrade
                  </Link>
                </Button>
              )}
              <div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full relative flex items-center justify-center"
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                >
                  <FiSun
                    size={15}
                    className="text-muted-foreground absolute transition-all opacity-0 dark:opacity-100 transition-all"
                  />
                  <FiMoon
                    size={15}
                    className="text-muted-foreground absolute transition-all opacity-100 dark:opacity-0 transition-all"
                  />
                </Button>
              </div>
              <div>
                <DropdownMenu
                  onOpenChange={(open) => setIsHelpMenuOpen(open)}
                  modal={false}
                >
                  <Tooltip open={isHelpTooltipOpen && !isAnyMenuOpen}>
                    <TooltipTrigger
                      asChild
                      onMouseEnter={() => setIsHelpTooltipOpen(true)}
                      onMouseLeave={() => setIsHelpTooltipOpen(false)}
                    >
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full"
                        >
                          <FiHelpCircle
                            size={15}
                            className="text-muted-foreground"
                          />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="center" sideOffset={8}>
                      <p>Help</p>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent
                    collisionBoundary={ref?.current}
                    className="min-w-[180px]"
                    onCloseAutoFocus={(e) => e.preventDefault()}
                  >
                    <DropdownMenuItem>
                      <FiMessageSquare size={14} className="mr-2" /> Support
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FiThumbsUp size={14} className="mr-2" />
                      Feedback
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FiFlag size={14} className="mr-2" /> Report a bug
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FiInfo size={14} className="mr-2" /> FAQ
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Popover
                  onOpenChange={setIsNotifsMenuOpen}
                  open={isNotifsMenuOpen}
                >
                  <Tooltip open={isNotifsTooltipOpen && !isAnyMenuOpen}>
                    <TooltipTrigger
                      asChild
                      onMouseEnter={() => setIsNotifsTooltipOpen(true)}
                      onMouseLeave={() => setIsNotifsTooltipOpen(false)}
                    >
                      <PopoverTrigger
                        asChild
                        onClick={(e) => e.preventDefault()}
                        onPointerDown={() =>
                          setIsNotifsMenuOpen((prev) => !prev)
                        }
                      >
                        <Button
                          size="icon"
                          variant="ghost"
                          className="rounded-full"
                        >
                          <FiBell size={15} className="text-muted-foreground" />
                        </Button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="center" sideOffset={8}>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                  <PopoverContent
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    collisionBoundary={ref?.current}
                  >
                    {/*<div className="flex items-center justify-between">*/}
                    {/*  <p className="font-medium text-[13px]">Notifications</p>*/}
                    {/*</div>*/}
                    <div className="flex flex-col justify-center items-center w-full">
                      <FiCheckCircle size={18} className="text-emerald-600" />
                      <p className="text-xs text-center font-medium mt-2">
                        You&#39;re all up to date
                      </p>
                      <p className="text-xs text-muted-foreground text-center mt-1">
                        You have no new notifications at this time
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <DropdownMenu
                  modal={false}
                  onOpenChange={(open) => setIsAccountMenuOpen(open)}
                  open={isAccountMenuOpen}
                >
                  <Tooltip open={isAccountTooltipOpen && !isAnyMenuOpen}>
                    <TooltipTrigger
                      asChild
                      onMouseEnter={() => setIsAccountTooltipOpen(true)}
                      onMouseLeave={() => setIsAccountTooltipOpen(false)}
                    >
                      <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer">
                          <AvatarImage src={user?.avatar} alt="avatar" />
                          <AvatarFallback>
                            <Skeleton className="h-[30px] w-[30px] rounded-full" />
                          </AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align={"end"} sideOffset={8}>
                      <p>Account</p>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent
                    className="min-w-[180px]"
                    onCloseAutoFocus={(e) => e.preventDefault()}
                    collisionBoundary={ref?.current}
                  >
                    <DropdownMenuLabel>
                      <p className="text-[13px]">Signed in as</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link
                      href="/subscribe?plan=professional&create=true"
                      passHref
                    >
                      <DropdownMenuItem>
                        <FiPlusCircle size={14} className="mr-2" />
                        Create team
                      </DropdownMenuItem>
                    </Link>
                    <Link href="/dashboard/settings/general" passHref>
                      <DropdownMenuItem>
                        <FiSettings size={14} className="mr-2" />
                        Account settings
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault();
                        setTheme(resolvedTheme === "dark" ? "light" : "dark");
                      }}
                    >
                      <div className="hidden dark:flex flex items-center w-full">
                        <FiSun size={14} className="mr-2" />
                        <span>Light mode</span>
                      </div>
                      <div className="dark:hidden flex items-center w-full">
                        <FiMoon size={14} className="mr-2" />
                        <span>Dark mode</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <FiMessageSquare size={14} className="mr-2" /> Support
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FiThumbsUp size={14} className="mr-2" />
                      Feedback
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={async () => {
                        await signOut({
                          callbackUrl: "http://localhost:3000/signin",
                        });
                      }}
                    >
                      <FiLogOut size={14} className="mr-2" />
                      Sign out
                    </DropdownMenuItem>
                    {user.role === "OWNER" && user.team.plan === "FREE" && (
                      <>
                        <DropdownMenuSeparator />
                        <div className="py-1.5 px-2">
                          <Button size="sm" className="w-full" asChild>
                            <Link
                              href="/subscribe?plan=professional"
                              passHref
                              onClick={() => setIsAccountMenuOpen(false)}
                            >
                              Upgrade
                            </Link>
                          </Button>
                        </div>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </TooltipProvider>
        {/*</div>*/}
      </div>
    </nav>
  );
};
