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
import {Skeleton} from "@/components/ui/skeleton";
import {DropdownMenu, DropdownMenuTrigger} from "@radix-ui/react-dropdown-menu";
import {DropdownMenuContent, DropdownMenuItem} from "@/components/ui/dropdown-menu";

export const EmailCard = ({ user, accessToken }) => {

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
              <div>
              <Button size="sm" variant="outline">
                Send verification
              </Button>
              </div>
            )}
          </div>
          ) : <Skeleton className="h-[48px] rounde-lg w-full" /> }
        </CardContent>
        <CardFooter className="justify-between items-center py-3 border-t h-[57px]">
          <p className="text-[13px] text-muted-foreground">
            Update your email address here
          </p>
          <Button size="sm" disabled={!user}>Update</Button>
        </CardFooter>
      </Card>
    </>
  );
};
