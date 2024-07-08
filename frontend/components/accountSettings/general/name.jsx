"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const NameCard = ({ user, accessToken }) => {
  const [name, setName] = useState(user?.name || "");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(user?.name || "");
    return () => setName("");
  }, [user]);

  const onUpdate = async () => {
    if (name?.length > 36) return;

    setIsLoading(true);
    const res = await fetch(`${baseUrl}/user/update-name`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    setIsLoading(false);
    if (res.ok) return toast.success("Your name has been updated");
    toast.error("Failed to update your name");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Display name</CardTitle>
        <CardDescription>
          This will be shown when collaborating with others.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {user && (
          <Input
            placeholder="Your name"
            className="max-w-[400px] fade-in-short-delayed opacity-0"
            value={name}
            maxLength={36}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        {!user && (
          <Skeleton
            placeholder="Your name"
            className="max-w-[400px] h-[36px] w-full rounded-md"
          />
        )}
      </CardContent>
      <CardFooter className="justify-between items-center py-3 border-t">
        <p className="text-[13px] text-muted-foreground">
          36 characters maximum
        </p>
        <Button
          size="sm"
          className="w-[74px]"
          disabled={isLoading || !user}
          onClick={onUpdate}
        >
          {isLoading ? <CgSpinner className="animate-spin" /> : "Confirm"}
        </Button>
      </CardFooter>
    </Card>
  );
};
