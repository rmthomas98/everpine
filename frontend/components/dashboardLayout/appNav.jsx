"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FiHelpCircle,
  FiUser,
  FiPlus,
  FiBox,
  FiMessageSquare,
  FiThumbsUp,
  FiLogOut,
  FiLink2,
  FiZap,
  FiSearch,
  FiInfo,
  FiFlag,
  FiSun,
  FiMoon,
  FiSettings,
  FiBell,
  FiCheckCircle,
} from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { useEffect, useState, useRef } from "react";
import { signOut } from "@/app/actions/signout";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export const AppNav = ({ email, subscriptionStatus, role }) => {
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
  const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   fetch("/api/is-authenticated")
  //     .then((res) => {
  //       if (res.ok) {
  //         res.json().then((data) => {
  //           setEmail(data.email);
  //         });
  //       } else {
  //         setEmail("");
  //       }
  //     })
  //     .catch(() => setEmail(""));
  // }, []);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <nav className="px-4 py-3 backdrop-blur h-[54px]">
        <div className="flex justify-between"></div>
      </nav>
    );

  return (
    <nav className="px-4 py-3 backdrop-blur fade-in-short-delayed opacity-0">
      <TooltipProvider delayDuration={100}>
        <div
          className="flex justify-between items-center"
          id="nav-container"
          ref={ref}
        >
          {/*<Link href="/dashboard" passHref>*/}
          {/*  <Image*/}
          {/*    src="/images/logos/full-dark-text.png"*/}
          {/*    width={100}*/}
          {/*    height={24}*/}
          {/*    quality={100}*/}
          {/*    alt="Charmify"*/}
          {/*  />*/}
          {/*</Link>*/}
          {/*<div*/}
          {/*  onClick={() => setIsSearchOpen(true)}*/}
          {/*  className="mr-4 h-7 max-w-[400px] w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm file:border-0 file:bg-transparent cursor-pointer file:text-sm file:font-medium placeholder:text-neutral-500 hover:border-neutral-300 hover:outline-none hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300 transition-colors"*/}
          {/*>*/}
          {/*  <div className="flex items-center h-full">*/}
          {/*    <FiSearch size={14} className="text-neutral-600" />*/}
          {/*    <p className="text-xs text-neutral-600 ml-2 font-medium">*/}
          {/*      Search...*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="w-full flex mr-4 max-w-[400px]">
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
                  className="h-[30px] pl-8 placeholder:text-[13px]"
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
          <div className="flex items-center space-x-2">
            <div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
              >
                {resolvedTheme === "dark" ? (
                  <FiSun size={15} className="text-muted-foreground" />
                ) : (
                  <FiMoon size={15} className="text-muted-foreground" />
                )}
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
                      <Button size="icon" variant="ghost">
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
                      onPointerDown={() => setIsNotifsMenuOpen((prev) => !prev)}
                    >
                      <Button size="icon" variant="ghost">
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
              >
                <Tooltip open={isAccountTooltipOpen && !isAnyMenuOpen}>
                  <TooltipTrigger
                    asChild
                    onMouseEnter={() => setIsAccountTooltipOpen(true)}
                    onMouseLeave={() => setIsAccountTooltipOpen(false)}
                  >
                    <DropdownMenuTrigger asChild>
                      {/*<Button size="icon" variant="ghost">*/}
                      {/*  <FiUser size={15} className="text-muted-foreground" />*/}
                      {/*</Button>*/}
                      <Avatar className="cursor-pointer">
                        <AvatarImage src="https://github.com/shadcn.png" />
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
                    <p className="text-xs text-muted-foreground">{email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <FiPlus size={14} className="mr-2" />
                    Create team
                  </DropdownMenuItem>
                  <Link href="/dashboard/settings" passHref>
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
                    {/*{resolvedTheme === "dark" ? (*/}
                    {/*  <div className="flex items-center">*/}
                    {/*    <FiSun size={14} className="mr-2" />*/}
                    {/*    <span>Light mode</span>*/}
                    {/*  </div>*/}
                    {/*) : (*/}
                    {/*  <div className="flex items-center">*/}
                    {/*    <FiMoon size={14} className="mr-2" />*/}
                    {/*    <span>Dark mode</span>*/}
                    {/*  </div>*/}
                    {/*)}*/}
                    {resolvedTheme === "dark" ? (
                      <FiSun size={14} className="mr-2" />
                    ) : (
                      <FiMoon size={14} className="mr-2" />
                    )}
                    {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
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
                      await signOut();
                      router.push("/login");
                    }}
                  >
                    <FiLogOut size={14} className="mr-2" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/*{role !== "READ_ONLY" && (*/}
            {/*  <div>*/}
            {/*    <DropdownMenu*/}
            {/*      modal={false}*/}
            {/*      onOpenChange={(open) => setIsCreateMenuOpen(open)}*/}
            {/*    >*/}
            {/*      <Tooltip open={isCreateTooltipOpen && !isAnyMenuOpen}>*/}
            {/*        <TooltipTrigger*/}
            {/*          asChild*/}
            {/*          onMouseEnter={() => setIsCreateTooltipOpen(true)}*/}
            {/*          onMouseLeave={() => setIsCreateTooltipOpen(false)}*/}
            {/*        >*/}
            {/*          <DropdownMenuTrigger asChild>*/}
            {/*            <Button size="icon">*/}
            {/*              <FiPlus size={15} />*/}
            {/*            </Button>*/}
            {/*          </DropdownMenuTrigger>*/}
            {/*        </TooltipTrigger>*/}
            {/*        <TooltipContent side="bottom" align={"end"} sideOffset={8}>*/}
            {/*          <p>Create</p>*/}
            {/*        </TooltipContent>*/}
            {/*      </Tooltip>*/}
            {/*      <DropdownMenuContent*/}
            {/*        onCloseAutoFocus={(e) => e.preventDefault()}*/}
            {/*        collisionBoundary={ref?.current}*/}
            {/*      >*/}
            {/*        <DropdownMenuLabel className="py-1">*/}
            {/*          /!*<p className="text-[13px]">Create new</p>*!/*/}
            {/*          <p className="text-xs text-muted-foreground">*/}
            {/*            Create new*/}
            {/*          </p>*/}
            {/*        </DropdownMenuLabel>*/}
            {/*        /!*<DropdownMenuSeparator />*!/*/}
            {/*        <DropdownMenuItem>*/}
            {/*          <FiZap size={14} className="mr-2" />*/}
            {/*          QR Code*/}
            {/*        </DropdownMenuItem>*/}
            {/*        <DropdownMenuItem>*/}
            {/*          <FiLink2 size={14} className="mr-2 -rotate-45" />*/}
            {/*          Link*/}
            {/*        </DropdownMenuItem>*/}
            {/*      </DropdownMenuContent>*/}
            {/*    </DropdownMenu>*/}
            {/*  </div>*/}
            {/*)}*/}
          </div>
        </div>
      </TooltipProvider>
    </nav>
  );
};
