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
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FiMoreHorizontal } from "react-icons/fi";

export const InvitesTable = ({
  invites,
  setInvites,
  accessToken,
  role,
  search,
}) => {
  const [selected, setSelected] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);

  const onSelect = (id) => {
    if (selected.includes(id)) {
      // remove the id from selected array
      const filtered = selected.filter((memberId) => memberId !== id);
      return setSelected(filtered);
    }

    setSelected([...selected, id]);
  };
  const onSelectAll = () => {
    if (selected.length === invites.length) {
      return setSelected([]);
    }
    setSelected(invites.map((invite) => invite.id));
  };

  useEffect(() => {
    if (selected.length === invites.length) {
      setIsAllSelected(true);
    } else if (selected.length === 0) {
      setIsAllSelected(false);
    } else {
      setIsAllSelected("indeterminate");
    }
  }, [invites, selected]);

  if (!invites.length) {
    return (
      <div className="mt-3 opacity-0 fade-in-short-delayed p-4 rounded-lg border shadow h-[200px] bg-accent/50 dark:bg-accent/30 w-full space-y-1 flex flex-col justify-center items-center">
        <p className="text-sm text-center">No pending invitations</p>
        <p className="text-[13px] text-muted-foreground text-center">
          You can invite members by using the form above
        </p>
      </div>
    );
  }

  return (
    <div className="mt-3 opacity-0 fade-in-short-delayed shadow rounded-lg border">
      <div className="w-full flex justify-between items-center px-4 py-3 border-b space-x-4">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="check-all"
            onCheckedChange={onSelectAll}
            checked={isAllSelected}
          />
          <label htmlFor="check-all" className="text-[13px]">
            {!selected.length
              ? `Select all (${invites?.length})`
              : `${selected.length} of ${invites?.length} selected`}
          </label>
        </div>
        <Button size="icon" variant="outline" className="h-8 w-8">
          <FiMoreHorizontal />
        </Button>
      </div>
      {invites.map((invite, i) => (
        <div
          key={invite.id}
          className={`w-full flex justify-between items-center p-4 space-x-4 ${
            i === invites.length - 1 ? undefined : "border-b"
          }`}
        >
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={selected.includes(invite.id)}
              onCheckedChange={() => onSelect(invite.id)}
            />
            <Avatar className="h-8 w-8">
              <AvatarImage
                className="bg-zinc-200 dark:bg-foreground transition-all"
                src={
                  invite.user
                    ? invite?.user.avatar
                    : `https://api.dicebear.com/9.x/lorelei/png?seed=${invite.email}`
                }
                alt="avatar"
              />
            </Avatar>
            <div className="flex flex-col">
              <p className="text-[13px]">{invite.email}</p>
              <p className="text-[13px] text-muted-foreground">
                {invite.role.split("")[0] + invite.role.slice(1).toLowerCase()}
              </p>
            </div>
          </div>
          <Button size="icon" variant="outline" className="h-8 w-8">
            <FiMoreHorizontal />
          </Button>
        </div>
      ))}
    </div>
  );
};
