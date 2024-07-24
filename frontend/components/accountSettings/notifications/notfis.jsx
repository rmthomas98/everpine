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
import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchUser = async (accessToken) => {
  const res = await fetch(`${baseUrl}/user/info`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return null;
  return await res.json();
};

export const Notifs = ({ accessToken }) => {
  const [user, setUser] = useState(null);
  const [allowCriticalAlerts, setAllowCriticalAlerts] = useState(false);
  const [allowProductUpdates, setAllowProductUpdates] = useState(false);
  const [allowMarketing, setAllowMarketing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUser(accessToken)
      .then((data) => {
        setUser(data);
        setAllowCriticalAlerts(data?.allowCriticalNotifs);
        setAllowProductUpdates(data?.allowProductNotifs);
        setAllowMarketing(data?.allowMarketingNotifs);
      })
      .catch(() => setUser(null));
    return () => setUser(null);
  }, []);

  const onUpdate = async () => {
    setIsLoading(true);
    const res = await fetch(`${baseUrl}/user/update-notifs`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        allowCriticalNotifs: allowCriticalAlerts,
        allowProductNotifs: allowProductUpdates,
        allowMarketingNotifs: allowMarketing,
      }),
    });

    setIsLoading(false);
    if (!res.ok) {
      const data = await res.json();
      return toast.error(data);
    }

    toast.success("Your notification settings have been updated");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Select what notifications you would like to receive by email
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <div>
                  <p className="text-sm">Critical alerts</p>
                  <p className="text-[13px] text-muted-foreground">
                    Receive alerts for events like subscription changes, team
                    updates, etc.
                  </p>
                </div>
              </div>
              {user ? (
                <Switch
                  className="fade-in-short-delayed opacity-0"
                  checked={allowCriticalAlerts}
                  onCheckedChange={setAllowCriticalAlerts}
                />
              ) : (
                <Skeleton className="h-[20px] min-w-[36px] rounded-full" />
              )}
            </div>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <div>
                  <p className="text-sm">Product updates</p>
                  <p className="text-[13px] text-muted-foreground">
                    Receive updates about new features, improvements, etc.
                  </p>
                </div>
              </div>
              {user ? (
                <Switch
                  className="fade-in-short-delayed opacity-0"
                  checked={allowProductUpdates}
                  onCheckedChange={setAllowProductUpdates}
                />
              ) : (
                <Skeleton className="h-[20px] min-w-[36px] rounded-full" />
              )}
            </div>
          </div>
          <div className="p-4 rounded-lg border">
            <div className="flex items-center justify-between space-x-4">
              <div>
                <div>
                  <p className="text-sm">Marketing</p>
                  <p className="text-[13px] text-muted-foreground">
                    Receive updates about new products, promotions, etc.
                  </p>
                </div>
              </div>
              {user ? (
                <Switch
                  className="fade-in-short-delayed opacity-0"
                  checked={allowMarketing}
                  onCheckedChange={setAllowMarketing}
                />
              ) : (
                <Skeleton className="h-[20px] min-w-[36px] rounded-full" />
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between items-center py-3 border-t">
        <p className="text-[13px] text-muted-foreground">
          Update your notification settings
        </p>
        <Button
          size="sm"
          className="w-[74px]"
          disabled={!user || isLoading}
          onClick={onUpdate}
        >
          {isLoading ? <CgSpinner className="animate-spin" /> : "Confirm"}
        </Button>
      </CardFooter>
    </Card>
  );
};
