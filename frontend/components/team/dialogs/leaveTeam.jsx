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

export const LeaveTeam = ({
  accessToken,
  teamId,
  isOpen,
  setIsOpen,
  teamName,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onLeave = async () => {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/team/leave`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId }),
    });

    if (!res.ok) {
      setIsLoading(false);
      const data = await res.json();
      return toast.error(data?.message, {
        description: data?.description,
      });
    }

    // we will have to refresh this page to update team
    window?.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave team {teamName}</DialogTitle>
          <DialogDescription className="text-[13px]">
            Are you sure you want to leave team{" "}
            <span className="text-primary">{teamName}</span>?<br />
            You will lose access to all resources associated with this team and
            will have to be invited back by a team owner to rejoin.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            disabled={isLoading}
            size="sm"
          >
            Cancel
          </Button>
          <Button
            onClick={onLeave}
            disabled={isLoading}
            variant="destructive"
            size="sm"
            className="w-[95px]"
          >
            {isLoading ? <CgSpinner className="animate-spin" /> : "Leave team"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
