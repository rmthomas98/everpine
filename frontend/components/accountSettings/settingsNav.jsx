"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const SettingsNav = () => {
  const path = usePathname();

  return (
    <div className="opacity-0 fade-in-short-delayed">
      <div>
        <Button
          asChild
          variant="ghost"
          className={`w-[120px] justify-start hover:accent-background ${
            path === "/dashboard/settings/profile"
              ? "text-foreground"
              : "text-muted-foreground hover:text-muted-foreground"
          }`}
          size="sm"
        >
          <Link href="/dashboard/settings/profile" passHref>
            Profile
          </Link>
        </Button>
      </div>
      <div>
        <Button
          asChild
          variant="ghost"
          className={`w-[120px] justify-start hover:accent-background ${
            path === "/dashboard/settings/authentication"
              ? "text-foreground"
              : "text-muted-foreground hover:text-muted-foreground"
          }`}
          size="sm"
        >
          <Link href="/dashboard/settings/profile" passHref>
            Authentication
          </Link>
        </Button>
      </div>
    </div>
  );
};
