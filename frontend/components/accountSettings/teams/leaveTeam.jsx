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
          <div className="text-sm text-muted-foreground">
            <p className="mt-2">
              Are you sure you want to leave the team{" "}
              <span className="text-foreground">{team?.team?.name}</span>?
            </p>
            <p className="mt-2">
              You will lose access to all recources associated with this team
              and will have to be invited back by an owner or admin to re-join.
            </p>
          </div>
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
