"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export const InvitesTable = ({ invites, setInvites, accessToken, role }) => {
  const [selected, setSelected] = useState([]);

  if (!invites.length) {
    return (
      <div className="mt-3 opacity-0 fade-in-short-delayed p-4 rounded-lg border shadow h-[200px] bg-accent/50 w-full space-y-1 flex flex-col justify-center items-center">
        <p className="text-sm text-center">No pending invitations</p>
        <p className="text-[13px] text-muted-foreground text-center">
          You can invite members by using the form above
        </p>
      </div>
    );
  }

  return <div className="mt-3 opacity-0 fade-in-short-delayed">invites</div>;
};
