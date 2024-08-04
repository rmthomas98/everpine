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

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const BulkRevoke = ({
  invites,
  accessToken,
  setInvites,
  isOpen,
  setIsOpen,
  teamId,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onRevoke = async () => {
    if (!invites?.length) return;
    setIsLoading(true);

    const res = await fetch(`${baseUrl}/team/members/invite/bulk-revoke`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ invites, teamId }),
    });

    if (!res.ok) {
      setIsLoading(false);
      return toast.error("Failed to revoke invites");
    }

    const { invites: newInvites } = await res.json();
    setInvites(newInvites);
    const msg = invites?.length > 1 ? "invitations" : "invitation";
    toast.success(`Successfully revoked ${invites?.length} ${msg}`);
    setIsOpen(false);
    setIsLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Revoke {invites?.length} invitation{invites?.length > 1 && "s"}
          </DialogTitle>
          <DialogDescription className="text-[13px]">
            Are you sure you want to revoke {invites?.length} invitation
            {invites?.length > 1 && "s"}? You will have to re-invite them if you
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
