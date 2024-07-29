"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FiMoreHorizontal } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { LeaveTeamDialog } from "@/components/accountSettings/teams/leaveTeam";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchTeams = async (accessToken) => {
  const res = await fetch(`${baseUrl}/team/roles`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) return [];
  return await res.json();
};

export const Teams = ({ accessToken }) => {
  const [teams, setTeams] = useState(null); // array of teams
  const [defaultTeam, setDefaultTeam] = useState(null); // team id
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isLeaveTeamDialogOpen, setIsLeaveTeamDialogOpen] = useState(false);
  const [isLoadingView, setIsLoadingView] = useState(false);
  const [isLoadingManage, setIsLoadingManage] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // fetch teams
    fetchTeams(accessToken)
      .then((data) => {
        setTeams(data?.roles);
        setDefaultTeam(data?.defaultTeamId);
      })
      .catch(() => setTeams([]));
    return () => setTeams(null);
  }, []);

  const onDefaultTeamChange = async (team) => {
    const res = await fetch(`${baseUrl}/team/default`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ teamId: team.id }),
    });
    return res.ok;
  };

  const onLeaveTeam = (team) => {
    setSelectedTeam(team);
    setIsLeaveTeamDialogOpen(true);
  };

  const onViewTeam = (team) => {
    setSelectedTeam(team);
    setIsLoadingView(true);
    if (team.id === defaultTeam) {
      return router.push("/dashboard");
    }
    // make call to backend to set a new default team and redirect to dashboard
    const res = onDefaultTeamChange(team);
    if (!res) {
      setIsLoadingView(false);
      return toast.error("Failed to view team");
    }

    // need to refresh the page and route to dashboard home
    window?.location.assign("/dashboard");
  };

  const onManageTeam = (team) => {
    setSelectedTeam(team);
    setIsLoadingManage(true);
    if (team.id === defaultTeam) return router.push("/dashboard/team");

    // make call to backend to set a new default team and redirect to team dashboard
    const res = onDefaultTeamChange(team);
    if (!res) {
      setIsLoadingManage(false);
      return toast.error("Failed to manage team");
    }

    // need to refresh the page and route to team dashboard view
    window?.location.assign("/dashboard/team");
  };

  return (
    <div className="w-full fade-in-short-delayed opacity-0">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Your teams</p>
        <Button size="sm" disabled={!teams} asChild>
          <Link href="/subscribe?plan=professional&create=true">
            Create new team
          </Link>
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-1.5">
        Manage your existings teams or create a new one.
      </p>
      {!teams && (
        <div className="mt-6 flex flex-col space-y-4">
          <Skeleton className="h-[73px] w-full rounded-lg" />
          <Skeleton className="h-[73px] w-full rounded-lg" />
        </div>
      )}
      {teams && (
        <div className="mt-6 flex flex-col space-y-4 fade-in-short-delayed opacity-0">
          {teams.map((team) => (
            <div
              key={team.id}
              className={`flex items-center justify-between bg-card-background border rounded-lg p-4 shadow`}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-[32px] w-[32px]">
                  <AvatarImage src={team.team.avatar} />
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{team.team.name}</p>
                  <p className="text-[13px] text-muted-foreground capitalize">
                    {team.role.toLowerCase()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onViewTeam(team.team)}
                  className="w-[56px]"
                  disabled={isLoadingView || isLoadingManage}
                >
                  {isLoadingView && selectedTeam.id === team.team.id ? (
                    <CgSpinner className="animate-spin" />
                  ) : (
                    "View"
                  )}
                </Button>
                {team.role === "OWNER" || team.role === "ADMIN" ? (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onManageTeam(team.team)}
                    className="w-[75px]"
                    disabled={isLoadingManage || isLoadingView}
                  >
                    {isLoadingManage && selectedTeam.id === team.team.id ? (
                      <CgSpinner className="animate-spin" />
                    ) : (
                      "Manage"
                    )}
                  </Button>
                ) : null}
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      disabled={isLoadingView || isLoadingManage}
                    >
                      <FiMoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="hover:!bg-destructive/10 text-red-600 hover:!text-red-600"
                      onSelect={() => onLeaveTeam(team)}
                    >
                      Leave team
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
      <LeaveTeamDialog
        isOpen={isLeaveTeamDialogOpen}
        setIsOpen={setIsLeaveTeamDialogOpen}
        accessToken={accessToken}
        team={selectedTeam}
        setTeams={setTeams}
        setDefaultTeam={setDefaultTeam}
        setSelectedTeam={setSelectedTeam}
      />
    </div>
  );
};
