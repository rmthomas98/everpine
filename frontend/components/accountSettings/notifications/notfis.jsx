"use client";

import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BiInfoCircle } from "react-icons/bi";
import { useEffect } from "react";
import { useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchUser = async (accessToken) => {};

export const Notifs = ({ accessToken }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser(accessToken)
      .then((data) => setUser(data))
      .catch(() => setUser(null));
    return () => setUser(null);
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Select what notifications you would like to receive
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className={`p-4 border rounded-lg`}>
            <div className="flex items-center justify-between">
              <div>
                <div>
                  <p className="text-sm">Credentials</p>
                  <p className="text-[13px] text-muted-foreground">
                    Sign in with email and password
                  </p>
                </div>
              </div>
              {user ? (
                <Switch className="fade-in-short-delayed opacity-0" />
              ) : (
                <Skeleton className="h-[20px] w-[36px] rounded-full" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
