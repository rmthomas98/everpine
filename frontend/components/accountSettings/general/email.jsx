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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import { toast } from "sonner";
import { UpdateEmailDialog } from "@/components/accountSettings/general/updateEmail";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const EmailCard = ({ user, accessToken }) => {
  const [isResending, setIsResending] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onResendVerification = async () => {
    // make fetch request to resend verification email
    setIsResending(true);
    const res = await fetch(`${baseUrl}/user/resend-verification`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    setIsResending(false);
    if (!res.ok) return toast.error("Failed to send verification email");
    toast.success("Verification email sent!");
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your email</CardTitle>
          <CardDescription>This email is used when signing in.</CardDescription>
        </CardHeader>
        <CardContent>
          {user ? (
            <div className="w-full px-4 py-3 rounded-lg border flex justify-between items-center opacity-0 fade-in-short-delayed">
              <div className="flex items-center space-x-4">
                <p className="text-[13px]">{user?.email}</p>
                <Badge variant={user?.isEmailVerified ? "primary" : "warning"}>
                  {user?.isEmailVerified ? "Verified" : "Unverified"}
                </Badge>
              </div>
              {!user?.isEmailVerified && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-[145px]"
                  onClick={onResendVerification}
                  disabled={isResending}
                >
                  {isResending ? (
                    <CgSpinner className="animate-spin" />
                  ) : (
                    "Resend verification"
                  )}
                </Button>
              )}
            </div>
          ) : (
            <Skeleton className="h-[48px] rounde-lg w-full" />
          )}
        </CardContent>
        <CardFooter className="justify-between items-center py-3 border-t h-[57px]">
          <p className="text-[13px] text-muted-foreground">
            Update your email address here
          </p>
          <Button
            size="sm"
            disabled={!user}
            className="w-[74px]"
            onClick={() => setIsOpen(true)}
          >
            Update
          </Button>
        </CardFooter>
      </Card>
      <UpdateEmailDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        accessToken={accessToken}
      />
    </>
  );
};
