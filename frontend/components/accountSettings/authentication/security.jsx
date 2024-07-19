"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { BiInfoCircle, BiLogoGoogle } from "react-icons/bi";
import { HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const Security = ({
  accessToken,
  user,
  credentials,
  setCredentials,
}) => {
  const [googleSignOn, setGoogleSignOn] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setCredentials(user.allowCredentialsAuth);
    setGoogleSignOn(user.allowGoogleAuth);
    setTwoFactorAuth(user.isTwoFactorAuthEnabled);
  }, [user]);

  const onUpdate = async () => {
    if (!user) return;
    // check if both are disabled
    if (!credentials && !googleSignOn) {
      return toast.error("Credentials or Google auth must be enabled");
    }

    setIsLoading(true);
    const body = { credentials, google: googleSignOn, twoFactorAuth };
    const res = await fetch(`${baseUrl}/user/update-auth`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    setIsLoading(false);
    if (!res.ok) {
      const data = await res.json();
      return toast.error(data);
    }

    if (!credentials) setTwoFactorAuth(false);
    toast.success("Your security settings have been updated");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Security</CardTitle>
        <CardDescription>
          Select different authentication methods.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div
            className={`p-4 border rounded-lg overflow-hidden ${
              credentials ? "h-[110px]" : "h-[73px]"
            } transition-all`}
          >
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
                <Switch
                  checked={credentials}
                  onCheckedChange={setCredentials}
                  className="fade-in-short-delayed opacity-0"
                />
              ) : (
                <Skeleton className="h-[20px] w-[36px] rounded-full" />
              )}
            </div>
            <div
              className={`flex items-center space-x-2 ml-[16px] mt-4 ${
                credentials ? "opacity-100" : "opacity-0"
              } transition-all`}
            >
              <div className="relative">
                <div className="h-[20px] w-[10px] border-l border-b border-muted-foreground absolute bottom-0 rounded-bl-[2px] -left-2"></div>
              </div>
              <Checkbox
                id="two-factor-auth"
                checked={twoFactorAuth}
                onCheckedChange={setTwoFactorAuth}
              />
              <div className="flex items-center space-x-1">
                <label
                  htmlFor="two-factor-auth"
                  className="text-[13px] font-medium"
                >
                  Enable two-factor auth (2FA)
                </label>
                <BiInfoCircle size={16} className="text-muted-foreground" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between border rounded-lg p-4">
            <div>
              <div>
                <p className="text-sm">Google sign-on</p>
                <p className="text-[13px] text-muted-foreground">
                  Sign in with your Google account
                </p>
              </div>
            </div>
            {user ? (
              <Switch
                checked={googleSignOn}
                onCheckedChange={setGoogleSignOn}
                className="fade-in-short-delayed opacity-0"
              />
            ) : (
              <Skeleton className="h-[20px] w-[36px] rounded-full" />
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between items-center py-3 border-t">
        <p className="text-[13px] text-muted-foreground">
          Update your security settings
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
