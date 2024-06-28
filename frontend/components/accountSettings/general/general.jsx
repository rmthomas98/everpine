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
import { useEffect, useState } from "react";
import { NameCard } from "@/components/accountSettings/general/name";
import { DeleteAccountCard } from "@/components/accountSettings/general/delete";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const getUserInfo = async (accessToken) => {
  const res = await fetch(`${baseUrl}/user/info/general`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return await res.json();
};

export const GeneralSettings = ({ accessToken }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserInfo(accessToken).then((data) => setUser(data));
    return () => setUser(null);
  }, []);

  return (
    <>
      <NameCard user={user} accessToken={accessToken} />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your email</CardTitle>
          <CardDescription>This email is used when signing in.</CardDescription>
        </CardHeader>
        <CardContent>
          <Input placeholder="Your email" className="max-w-[400px]" />
        </CardContent>
        <CardFooter className="justify-between items-center py-3 border-t">
          <p className="text-[13px] text-muted-foreground">
            We will send you a verification email
          </p>
          <Button size="sm">Confirm</Button>
        </CardFooter>
      </Card>
      <DeleteAccountCard />
    </>
  );
};
