"use client";

import { ThemedLogo } from "@/components/logo/themedLogo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const ViewInvite = ({ accessToken, invite }) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const router = useRouter();

  const onAccept = async () => {
    setIsAccepting(true);
    const res = await fetch(`${baseUrl}/team/members/invite/accept`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id: invite.inviteId }),
    });

    if (!res.ok) {
      setIsAccepting(false);
      const data = await res.json();
      return toast.error(data);
    }

    toast.success("You are now apart of the team!");
    router.push("/dashboard");
  };

  const onDecline = async () => {
    setIsDeclining(true);
    const res = await fetch(`${baseUrl}/team/members/invite/decline`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ id: invite.inviteId }),
    });

    if (!res.ok) {
      setIsDeclining(false);
      const data = await res.json();
      return toast.error(data);
    }

    toast.success("You have declined the invite.");
    router.push("/dashboard");
  };

  return (
    <div className="fade-in-short-delayed opacity-0 max-w-[400px] mx-auto">
      <Card>
        <CardHeader>
          <Avatar className="h-10 w-10 mx-auto">
            <AvatarImage src={invite.avatar} alt={invite.name} />
            <AvatarFallback>{invite.name[0]}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-center">{invite.name}</CardTitle>
          <CardDescription className="text-center text-[13px]">
            You've been invited to join team {invite.name}. You can accept the
            invitation below. You will be able to access the team's resources
            and collaborate with the team members.
          </CardDescription>
        </CardHeader>
        <CardFooter className="space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            disabled={isAccepting || isDeclining}
            onClick={onDecline}
          >
            {isDeclining ? <CgSpinner className="animate-spin" /> : "Decline"}
          </Button>
          <Button
            size="sm"
            className="w-full"
            disabled={isAccepting || isDeclining}
            onClick={onAccept}
          >
            {isAccepting ? <CgSpinner className="animate-spin" /> : "Accept"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
