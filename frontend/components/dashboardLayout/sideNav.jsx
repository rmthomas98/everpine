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
import { useState, useEffect } from "react";
import { TeamPicker } from "@/components/teamPicker";
import {
  BiBarChart,
  BiFolder,
  BiGlobe,
  BiGroup,
  BiHomeAlt,
  BiLinkAlt,
} from "react-icons/bi";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const navItems = [
  {
    label: "Home",
    route: "/dashboard",
    icon: <BiHomeAlt size={15} className="mr-2.5 relative bottom-[1px]" />,
    roles: true,
  },
  {
    label: "Links",
    route: "/dashboard/links",
    icon: <BiLinkAlt size={15} className="mr-2.5 relative bottom-[1px]" />,
    roles: true,
  },
  {
    label: "QR Codes",
    route: "/dashboard/qr",
    icon: <HiMiniQrCode size={15} className="mr-2.5 relative bottom-[1px]" />,
    roles: true,
  },
  {
    label: "Pages",
    route: "/dashboard/pages",
    icon: <BiGlobe size={15} className="mr-2.5 relative bottom-[1px]" />,
    roles: true,
  },
  {
    label: "Analytics",
    route: "/dashboard/analytics",
    icon: <BiBarChart size={15} className="mr-2.5 relative bottom-[1px]" />,
    roles: true,
  },
  {
    label: "Campaigns",
    route: "/dashboard/campaigns",
    icon: <BiFolder size={15} className="mr-2.5 relative bottom-[1px]" />,
    roles: true,
  },
  {
    label: "My Team",
    route: "/dashboard/team/members",
    actualRoute: "/dashboard/team/members",
    icon: <BiGroup size={15} className="mr-2.5 relative bottom-[1px]" />,
    roles: ["OWNER", "ADMIN"],
  },
];

const fetchTeams = async (accessToken) => {
  const res = await fetch(`${baseUrl}/team/roles`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
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
      slug: item.team.slug,
    };
  });

  return { teams: filteredData, defaultTeam: defaultTeamId };
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
    return () => setTeams([]);
  }, []);

  return (
    <div
      // style={{ marginLeft: "-100vw", paddingLeft: "100vw" }}
      className={`border-r fade-in-short-delayed opacity-0`}
    >
      <div
        className={`py-6 px-4 h-[calc(100vh-55px)] flex flex-col justify-between w-[242px] sticky top-[55px] overflow-y-auto`}
      >
        <div className="w-full">
          <div>
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
            <div className={user?.role !== "VIEWER" ? "my-6" : "mb-6"}>
              {navItems
                .filter((item) => {
                  if (item.roles === true) return true;
                  if (item.roles.includes(user.role)) return true;
                  return false;
                })
                .map((item) => (
                  <div key={item.route}>
                    <Button
                      asChild
                      variant="ghost"
                      className={`w-full justify-start hover:bg-zinc-50 dark:hover:bg-zinc-900 ${
                        path.split("/")[2] === item.route.split("/")[2]
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-muted-foreground"
                      }`}
                      size="sm"
                    >
                      <Link
                        href={item.actualRoute ? item.actualRoute : item.route}
                        passHref
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </Button>
                  </div>
                ))}
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
