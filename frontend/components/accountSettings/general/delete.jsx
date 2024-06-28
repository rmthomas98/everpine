"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const DeleteAccountCard = () => {
  return (
    <Card className="w-full border border-destructive/40 dark:border-destructive/90">
      <CardHeader>
        <CardTitle>Delete account</CardTitle>
        <CardDescription>
          This will permanently delete your account. This action cannot be
          undone.
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-between items-center py-3 border-t rounded-bl-lg rounded-br-lg border-destructive/40 dark:border-destructive/90 bg-destructive/10">
        <p className="text-[13px] text-red-600">Proceed with caution</p>
        <Button size="sm" variant="destructive">
          Delete account
        </Button>
      </CardFooter>
    </Card>
  );
};
