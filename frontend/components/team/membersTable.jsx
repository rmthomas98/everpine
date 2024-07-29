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
import { Separator } from "@/components/ui/separator";
import { FiMoreHorizontal } from "react-icons/fi";
import { TableSkeleton } from "@/components/team/tableSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const MembersTable = ({
  members,
  setMembers,
  accessToken,
  userId,
  role,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selected, setSelected] = useState([]);

  const onSelect = (id) => {};

  const onSelectAll = () => {
    if (selectAll) {
      setSelected([]);
      setSelectAll(false);
      return;
    }
    // add all except the current user
    const filtered = members.filter((member) => member.user.id !== userId);
    setSelected(filtered.map((member) => member.user.id));
    setSelectAll(true);
  };

  return (
    <div className="mt-3">
      {members?.length ? (
        <div className="shadow rounded-lg border w-full opacity-0 fade-in-short-delayed">
          <div className="w-full flex justify-between items-center px-4 py-3 border-b space-x-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="check-all"
                onCheckedChange={onSelectAll}
                checked={"indeterminate"}
                disabled={members.length === 1}
              />
              <label htmlFor="check-all" className="text-[13px]">
                {!selectAll
                  ? `Select all (${members?.length})`
                  : `${selected.length} of ${members?.length} selected`}
              </label>
            </div>
            <Button size="icon" variant="outline" className="h-8 w-8">
              <FiMoreHorizontal />
            </Button>
          </div>
          {members.map((member, i) => (
            <div
              key={member.user.id}
              className={`w-full flex justify-between items-center p-4 space-x-4 ${
                i === members.length - 1 ? undefined : "border-b"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selected.includes(member.user.id)}
                  disabled={member.user.id === userId}
                />
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    className="bg-zinc-200 dark:bg-foreground transition-all"
                    src={member.user.avatar}
                    alt="avatar"
                  />
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-[13px]">{member.user.email}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {member.role.split("")[0] +
                      member.role.slice(1).toLowerCase()}
                  </p>
                </div>
              </div>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <FiMoreHorizontal />
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
};
