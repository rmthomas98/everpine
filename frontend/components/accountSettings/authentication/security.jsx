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
import { useState } from "react";
import { BiLogoGoogle } from "react-icons/bi";
import { HiOutlineLockClosed, HiOutlineShieldCheck } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";

export const Security = ({ accessToken, user }) => {
  const [credentials, setCredentials] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [googleSignOn, setGoogleSignOn] = useState(false);

  console.log(user);

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
              credentials ? "h-[108px]" : "h-[71px]"
            } transition-all`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div>
                  <p className="text-sm">Email and password</p>
                  <p className="text-[13px] text-muted-foreground">
                    Sign in traditionally with credentials
                  </p>
                </div>
              </div>
              <Switch checked={credentials} onCheckedChange={setCredentials} />
            </div>
            {/*<div*/}
            {/*  className={`border-b border-dashed my-4 ${*/}
            {/*    credentials ? "opacity-100" : "opacity-0"*/}
            {/*  } transition-all`}*/}
            {/*></div>*/}
            <div
              className={`flex items-center space-x-2 ml-[16px] mt-4 ${
                credentials ? "opacity-100" : "opacity-0"
              } transition-all`}
            >
              <div className="relative">
                <div className="h-[20px] w-[10px] border-l border-b border-foreground absolute bottom-0 rounded-bl-[2px] -left-2"></div>
              </div>
              <Checkbox id="two-factor-auth" />
              <label
                htmlFor="two-factor-auth"
                className="text-[13px] font-medium"
              >
                Enable two-factor auth (2FA)
              </label>
            </div>
          </div>
          <div className="flex items-center justify-between border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <BiLogoGoogle size={20} />
              <p className="text-sm">Google sign-on</p>
            </div>
            <Switch />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between items-center py-3 border-t">
        <p className="text-[13px] text-muted-foreground">
          Update your security settings
        </p>
        <Button size="sm" className="w-[74px]">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  );
};
