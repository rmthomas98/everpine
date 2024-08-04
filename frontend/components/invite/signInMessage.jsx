"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export const SignInMessage = () => {
  return (
    <Card className="mx-auto max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-center">
          Sign in to view this invite
        </CardTitle>
        <CardDescription className="text-center text-[13px]">
          You need to sign in to view this invitation. If you don&apos;t have an
          account, you can sign up for free.
        </CardDescription>
      </CardHeader>
      <CardFooter className="space-x-2">
        <Button className="w-full" size="sm" asChild>
          <Link href="/signin" target="_blank">
            Sign in
          </Link>
        </Button>
        <Button className="w-full" size="sm" asChild>
          <Link href="signup" target="_blank">
            Sign up
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
