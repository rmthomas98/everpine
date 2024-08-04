"use client";

import { ThemedLogo } from "@/components/logo/themedLogo";
import { useEffect, useState } from "react";
import { SignInMessage } from "@/components/invite/signInMessage";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ViewInvite } from "@/components/invite/viewInvite";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// look up invite and make sure it's valid
const getInvite = async (accessToken, token) => {
  const res = await fetch(`${baseUrl}/team/members/invite/get`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) return null;
  const { invite } = await res.json();
  return invite;
};

export const InviteWrapper = ({ user, token }) => {
  const [invite, setInvite] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(user));

  useEffect(() => {
    if (!user) return setIsLoading(false);

    getInvite(user.access_token, token)
      .then((res) => {
        setInvite(res);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));

    return () => {
      setInvite(null);
      setIsLoading(false);
    };
  }, []);

  return (
    <div className="p-4 opacity-0 fade-in-short-delayed">
      <div className="mx-auto w-fit mb-4">
        <ThemedLogo />
      </div>
      {!user && <SignInMessage />}
      {isLoading && <InviteCardSkeleton />}
      {user && !isLoading && !invite && <InviteNotFound />}
      {user && invite && (
        <ViewInvite invite={invite} accessToken={user.access_token} />
      )}
    </div>
  );
};

const InviteCardSkeleton = () => {
  return (
    <div className="w-full max-w-[400px] mx-auto border shadow rounded-lg p-6">
      <Skeleton className="h-10 w-10 rounded-full mx-auto" />
      <Skeleton className="h-4 w-full max-w-40 mt-2 rounded mx-auto mb-6" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full mt-2" />
      <div className="flex space-x-2 mt-6 w-full">
        <Skeleton className="h-8 w-full rounded-md" />
        <Skeleton className="h-8 w-full rounded-md" />
      </div>
    </div>
  );
};

const InviteNotFound = () => {
  return (
    <Card className="opacity-0 fade-in-short-delayed max-w-[400px] mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Invite not found</CardTitle>
        <CardDescription className="text-center text-[13px]">
          The invite you are trying to access does not exist. You can check with
          the team owner to get a new invite.
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
