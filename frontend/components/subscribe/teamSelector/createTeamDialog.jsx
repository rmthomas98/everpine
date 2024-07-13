"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const CreateTeamDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  setTeams,
  setSelectedTeam,
  setValue,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const searchParams = useSearchParams();
  const createNewTeam = searchParams.get("create") === "true";

  useEffect(() => {
    if (createNewTeam) setIsDialogOpen(true);
  }, []);

  useEffect(() => {
    if (isDialogOpen) reset();
  }, [isDialogOpen]);

  const onSubmit = async (data) => {
    const { teamName } = data;
    // don't create a new team in db yet
    // just add the team to the list of teams
    // we can create the team when the user confirms payment
    // generate a random id for the team
    const team = {
      id: Math.random().toString(36).substr(2, 9),
      role: "OWNER",
      name: teamName.trim(),
      avatar: `/images/avatars/${Math.floor(Math.random() * 5) + 1}.webp`,
      plan: "FREE",
      create: true,
    };

    setTeams((prevTeams) => [...prevTeams, team]);
    setSelectedTeam(team);
    setValue(team);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new team</DialogTitle>
          <DialogDescription>
            Continue to start collaborating with increased limits and features.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            placeholder="Team name..."
            className={`w-full ${
              errors.teamName &&
              "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive dark:focus-visible:border-destructive dark:focus-visible:ring-destructive/50"
            }`}
            {...register("teamName", {
              required: true,
              maxLength: 50,
              minLength: 2,
            })}
          />
          {errors.teamName?.type === "required" && (
            <p className="text-destructive text-xs mt-1.5 dark:text-red-600">
              Please enter a team name
            </p>
          )}
          {errors.teamName?.type === "minLength" && (
            <p className="text-destructive text-xs mt-1.5 dark:text-red-600">
              Team name must be at least 2 characters
            </p>
          )}
          {errors.teamName?.type === "maxLength" && (
            <p className="text-destructive text-xs mt-1.5 dark:text-red-600">
              Team name cannot be more than 50 characters
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDialogOpen(false)}
            type="button"
          >
            Cancel
          </Button>
          <Button size="sm" onClick={handleSubmit(onSubmit)}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
