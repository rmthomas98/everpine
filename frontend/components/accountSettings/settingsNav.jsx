"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const SettingsNav = () => {
  const path = usePathname();

  return (
    <div className="opacity-0 fade-in-short-delayed w-[160px] min-w-[160px]">
      <div>
        <Button
          asChild
          variant="ghost"
          className={`w-full justify-start hover:accent-background ${
            path === "/dashboard/settings/general"
              ? "text-foreground"
              : "text-muted-foreground hover:text-muted-foreground"
          }`}
          size="sm"
        >
          <Link href="/dashboard/settings/general" passHref>
            General
          </Link>
        </Button>
      </div>
      <div>
        <Button
          asChild
          variant="ghost"
          className={`w-full justify-start hover:accent-background ${
            path === "/dashboard/settings/auth"
              ? "text-foreground"
              : "text-muted-foreground hover:text-muted-foreground"
          }`}
          size="sm"
        >
          <Link href="/dashboard/settings/auth" passHref>
            Authentication
          </Link>
        </Button>
      </div>
      <div>
        <Button
          asChild
          variant="ghost"
          className={`w-full justify-start hover:accent-background ${
            path === "/dashboard/settings/teams"
              ? "text-foreground"
              : "text-muted-foreground hover:text-muted-foreground"
          }`}
          size="sm"
        >
          <Link href="/dashboard/settings/teams" passHref>
            Teams
          </Link>
        </Button>
      </div>
      <div>
        <Button
          asChild
          variant="ghost"
          className={`w-full justify-start hover:accent-background ${
            path === "/dashboard/settings/notifs"
              ? "text-foreground"
              : "text-muted-foreground hover:text-muted-foreground"
          }`}
          size="sm"
        >
          <Link href="/dashboard/settings/notifs" passHref>
            Notifications
          </Link>
        </Button>
      </div>
    </div>
  );
};
