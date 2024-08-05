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
import { Avatar, AvatarImage } from "@/components/ui/avatar";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const BulkRemoveMembers = ({
  members,
  accessToken,
  setMembers,
  isOpen,
  setIsOpen,
  teamId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onRemove = async () => {
    // get member role id
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/team/members/remove`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId, roleIds: members }),
    });

    if (!res.ok) {
      setIsLoading(false);
      const data = await res.json();
      return toast.error(data);
    }

    const { members: newMembers } = await res.json();
    setMembers(newMembers);
    setIsOpen(false);
    setIsLoading(false);
    toast.success(
      `${members?.length} member${
        members?.length > 1 ? "s" : ""
      } successfully removed`,
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Remove {members?.length} team member{members?.length > 1 && "s"}
          </DialogTitle>
          <DialogDescription className="text-[13px]">
            Are you sure you want to remove {members?.length} team member
            {members?.length > 1 && "s"}? You will have to re-invite them if you
            want them to join your team. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
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
