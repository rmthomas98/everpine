"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const DeleteAccountCard = ({ accessToken, user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onDeleteAccount = async () => {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/user/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    setIsLoading(false);
    if (!res.ok) return toast.error("Failed to delete your account");
    await signOut();
    router.push("/signin");
  };

  return (
    <>
      <Card className="w-full border border-destructive/40 dark:border-destructive/90">
        <CardHeader>
          <CardTitle>Delete account</CardTitle>
          <CardDescription>
            This will permanently delete your account. This action cannot be
            undone.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-between items-center py-3 border-t rounded-bl-lg rounded-br-lg border-destructive/40 dark:border-destructive/90 bg-destructive/5 dark:bg-destructive/10">
          <p className="text-[13px] text-red-500">Proceed with caution</p>
          <Button size="sm" variant="destructive">
            Delete account
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
