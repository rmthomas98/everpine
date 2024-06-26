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
import { Skeleton } from "@/components/ui/skeleton";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const getUser = async (accessToken) => {
  try {
    const res = await fetch(`${baseUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    return null;
  }
};

export const GeneralSettings = ({ accessToken }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isUpdatingName, setIsUpdatingName] = useState(false);
  const [isUpdatingEmail, setIsUpdatingEmail] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);

  useEffect(() => {
    getUser(accessToken)
      .then((data) => {
        const { name, email, avatar } = data;
        console.log(name, email, avatar);
        setName(name || "");
        setEmail(email || "");
        setAvatar(avatar || "");
        setUser(data);
      })
      .catch(() => setUser(null));

    return () => setUser(null);
  }, []);

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Your name</CardTitle>
          <CardDescription>
            This will be displayed on your profile.
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
          <Button size="sm" disabled={isUpdatingName || name === user?.name}>
            Confirm
          </Button>
        </CardFooter>
      </Card>
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
          <Button size="sm" disabled>
            Confirm
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
