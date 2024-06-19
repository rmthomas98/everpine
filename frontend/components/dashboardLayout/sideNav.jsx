"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiBarChart2, FiPlus, FiUsers, FiFolder } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { HiMiniQrCode } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import { ThemedLogo } from "@/components/themedLogo";
import { useState, useEffect } from "react";
import { TeamPicker } from "@/components/teamPicker";
import { BiGlobe, BiHomeAlt, BiLinkAlt } from "react-icons/bi";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchTeams = async (accessToken) => {
  try {
    const res = await fetch(`${baseUrl}/team/roles`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const { roles: data, defaultTeamId } = await res.json();
    let filteredData = data.map((item) => {
      return {
        role: item.role,
        id: item.teamId,
        name: item.team.name,
        avatar: item.team.avatar,
        plan: item.team.plan,
      };
    });

    return { teams: filteredData, defaultTeam: defaultTeamId };
  } catch (e) {
    return [];
  }
};

const getUser = async (accessToken) => {
  try {
    const res = await fetch(`${baseUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
};

export const SideNav = ({ user }) => {
  const path = usePathname();
  const [teams, setTeams] = useState([]);
  const [defaultTeam, setDefaultTeam] = useState(null);
  const accessToken = user?.access_token;

  const getTeams = async () => {
    const data = await fetchTeams(accessToken);
    setTeams(data?.teams);
    setDefaultTeam(data?.teams?.find((team) => team.id === data?.defaultTeam));
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div
      style={{ marginLeft: "-100%", paddingLeft: "100%" }}
      className={`border-r fade-in-short-delayed opacity-0 bg-neutral-50 dark:bg-neutral-900`}
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
            {user.role !== "VIEWER" && (
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
                    <BiLinkAlt size={15} className="mr-2" />
                    Link
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HiMiniQrCode size={15} className="mr-2" />
                    QR Code
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BiGlobe size={15} className="mr-2" />
                    Page
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
                    <BiHomeAlt
                      size={15}
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
                    <BiLinkAlt
                      size={15}
                      className="mr-2.5 relative bottom-[1px]"
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
                    <HiMiniQrCode
                      size={15}
                      className="mr-2.5 relative bottom-[1px]"
                    />
                    QR Codes
                  </Link>
                </Button>
              </div>
              <div>
                <Button
                  asChild
                  variant="ghost"
                  className={`w-full justify-start hover:accent-background ${
                    path === "/dashboard/pages"
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-muted-foreground"
                  }`}
                  size="sm"
                >
                  <Link href="/dashboard/pages" passHref>
                    <BiGlobe
                      size={15}
                      className="mr-2.5 relative bottom-[1px]"
                    />
                    Pages
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
                      size={15}
                      className="mr-2.5 relative bottom-[1px]"
                    />
                    Analytics
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
                  <Link href="/dashboard/series" passHref>
                    <FiFolder
                      size={15}
                      className="mr-2.5 relative bottom-[1px]"
                    />
                    Campaigns
                  </Link>
                </Button>
              </div>
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
            </div>
          </div>
        </div>
        <TeamPicker
          teams={teams}
          defaultTeam={defaultTeam}
          accessToken={accessToken}
        />
      </div>
    </div>
  );
};
