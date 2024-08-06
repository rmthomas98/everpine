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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const RevokeInvite = ({
  invite,
  accessToken,
  isOpen,
  setIsOpen,
  setInvites,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onRevoke = async () => {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/team/members/invite/revoke`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inviteId: invite.id }),
    });

    if (!res.ok) {
      setIsLoading(false);
      return toast.error("Failed to revoke invite");
    }

    const { invites } = await res.json();
    setInvites(invites);
    setIsOpen(false);
    setIsLoading(false);
    toast.success("Invite successfully revoked");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revoke invitation</DialogTitle>
          <DialogDescription className="text-[13px]">
            Are you sure you want to revoke this invitation? You will have to
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
                  src={invite?.user?.avatar || undefined}
                  alt="avatar"
                />
                <AvatarFallback>
                  <p className="text-xs">{invite?.email[0].toUpperCase()}</p>
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-[13px]">{invite?.email}</p>
                <p className="text-[13px] text-muted-foreground">
                  {invite?.role.split("")[0] +
                    invite?.role.slice(1).toLowerCase()}
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
            onClick={onRevoke}
            disabled={isLoading}
            className="w-[69px]"
          >
            {isLoading ? <CgSpinner className="animate-spin" /> : "Revoke"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
