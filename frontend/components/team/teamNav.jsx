"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const navItems = [
  {
    label: "Members",
    route: "/dashboard/team/members",
  },
  {
    label: "Domains",
    route: "/dashboard/team/domains",
  },
  {
    label: "Subscription",
    route: "/dashboard/team/subscription",
    role: "OWNER",
  },
  {
    label: "Usage",
    route: "/dashboard/team/limits",
  },
  {
    label: "Single sign-on",
    route: "/dashboard/team/sso",
  },
];

export const TeamNav = ({ role }) => {
  const path = usePathname();

  return (
    <div className="opacity-0 fade-in-short-delayed w-[160px] min-w-[160px]">
      {navItems
        .filter((item) => {
          if (!item.role) return true;
          if (item.role && role === "OWNER") return true;
          return false;
        })
        .map((item) => (
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
