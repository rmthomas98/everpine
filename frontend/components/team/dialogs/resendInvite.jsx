"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { BiLinkAlt, BiCopy, BiCheck } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ResendInvite = ({ invite, isOpen, setIsOpen, accessToken }) => {
  const [isLoading, setIsLoading] = useState(false);

  const resendInvite = async () => {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/team/members/invite/resend`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inviteId: invite?.id }),
    });

    setIsLoading(false);
    if (!res.ok) return toast.error("Failed to resend invite");

    setIsOpen(false);
    toast.success("Invitation email has been resent!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Resend invitation email</DialogTitle>
          <DialogDescription className="text-[13px]">
            You are about to resend the invitation email to {invite?.email}. Are
            you sure you want to resend the invitation?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={resendInvite}
            loading={isLoading}
            disabled={isLoading}
            className="w-[70px]"
          >
            {isLoading ? <CgSpinner className="animate-spin" /> : "Resend"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
