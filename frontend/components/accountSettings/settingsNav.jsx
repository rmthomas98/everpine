"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const navItems = [
  {
    label: "General",
    route: "/dashboard/settings/general",
  },
  {
    label: "Authentication",
    route: "/dashboard/settings/auth",
  },
  {
    label: "Teams",
    route: "/dashboard/settings/teams",
  },
  {
    label: "Notifications",
    route: "/dashboard/settings/notifs",
  },
];

export const SettingsNav = () => {
  const path = usePathname();

  return (
    <div className="opacity-0 fade-in-short-delayed w-[160px] min-w-[160px]">
      {navItems.map((item) => (
        <div key={item.route}>
          <Button
            asChild
            variant="ghost"
            className={`w-full justify-start hover:bg-zinc-50 dark:hover:bg-zinc-900 ${
              path === item.route
                ? "text-foreground"
                : "text-muted-foreground hover:text-muted-foreground"
            }`}
            size="sm"
          >
            <Link href={item.route} passHref>
              {item.label}
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
};
