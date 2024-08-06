"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const RemoveMember = ({
  member,
  accessToken,
  setMembers,
  isOpen,
  setIsOpen,
  teamId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onRemove = async () => {
    // get member role id
    const { id } = member;
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/team/members/remove`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId, roleIds: [id] }),
    });

    if (!res.ok) {
      setIsLoading(false);
      const data = await res.json();
      return toast.error(data);
    }

    const { members } = await res.json();
    setMembers(members);
    setIsOpen(false);
    setIsLoading(false);
    toast.success("Member successfully removed");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove team member</DialogTitle>
          <DialogDescription className="text-[13px]">
            Are you sure you want to remove this team member? You will have to
            re-invite them if you want them to join your team. This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="rounded-lg border p-2">
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  className="bg-zinc-200 dark:bg-foreground transition-all"
                  src={member?.user.avatar || undefined}
                  alt="avatar"
                />
                <AvatarFallback>
                  <p className="text-xs">
                    {member?.user.email[0].toUpperCase()}
                  </p>
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-[13px]">{member?.user.email}</p>
                <p className="text-[13px] text-muted-foreground">
                  {member?.role.split("")[0] +
                    member?.role.slice(1).toLowerCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={onRemove}
            disabled={isLoading}
            className="w-[69px]"
          >
            {isLoading ? <CgSpinner className="animate-spin" /> : "Remove"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
