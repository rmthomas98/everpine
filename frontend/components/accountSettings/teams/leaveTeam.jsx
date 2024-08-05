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

export const LeaveTeamDialog = ({
  isOpen,
  setIsOpen,
  accessToken,
  team,
  setTeams,
  setDefaultTeam,
  setSelectedTeam,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const onLeaveTeam = async () => {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/team/leave`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId: team?.team.id }),
    });

    if (!res.ok) {
      const data = await res.json();
      setIsLoading(false);
      return toast.error(data?.message, {
        description: data?.description,
      });
    }

    const data = await res.json();
    const { changeDefault } = data;
    if (changeDefault) return window?.location.reload();
    setTeams(data?.roles || []);
    setDefaultTeam(data?.defaultTeam || null);
    setSelectedTeam(null);
    setIsLoading(false);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave team</DialogTitle>
          <DialogDescription className="text-[13px]">
            Are you sure you want to leave team{" "}
            <span className="text-primary">{team?.team?.name}</span>?<br />
            You will lose access to all resources associated with this team and
            will have to be invited back by a team owner to rejoin.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="w-[74px]"
            onClick={onLeaveTeam}
            disabled={isLoading || !team}
          >
            {isLoading ? <CgSpinner className="animate-spin" /> : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
