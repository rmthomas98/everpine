"use client";

import { ThemedLogo } from "@/components/ThemedLogo";
import { HiChevronDown } from "react-icons/hi";
import { FaCheck } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/actions/signout";

export const Subscribe = ({ email, subscriptionStatus }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const activateTrial = async () => {};

  return (
    <>
      <nav className="px-4 py-2.5">
        <div className="flex justify-between items-center max-w-[1100px] mx-auto">
          <ThemedLogo />
          <div className="flex items-center space-x-2">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  {/*<FiUser size={15} className="text-neutral-700" />*/}
                  {/*<FaUser size={14} className="text-neutral-950" />*/}
                  Account
                  <HiChevronDown
                    size={16}
                    className="ml-1 text-muted-foreground"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[160px]">
                <DropdownMenuLabel>
                  <p className="text-[13px]">Signed in as</p>
                  <p className="text-xs text-muted-foreground">{email}</p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await signOut();
                    router.push("/login");
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
      <div className="p-4 mt-6 pb-10">
        <div className="max-w-[800px] mx-auto">
          <h1 className="text-4xl font-extrabold">
            Everything you need to get started!
          </h1>
          <p className="text-muted-foreground mt-2">
            One plan for all your needs.{" "}
            {subscriptionStatus === "NEW_USER" &&
              "Start with a 14-day free trial. No credit card required."}
            {subscriptionStatus === "INACTIVE" &&
              "Activate your subscription to get full access."}
          </p>
          <div className="mt-8 flex">
            <Card className="max-[500px]:w-full">
              <CardHeader className="pb-4">
                <CardTitle>dreamist pro</CardTitle>
                <CardDescription>
                  Get full access to all features and benefits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex">
                  <h2 className="text-3xl font-bold">$10</h2>
                  <span className="text-muted-foreground ml-1.5 mt-3 text-sm">
                    /month
                  </span>
                </div>
                <div className="pt-2">
                  <div className="flex flex-col">
                    <div className="flex items-center mt-2">
                      <FaCheck size={13} />
                      <p className="text-sm ml-2">
                        Unlimited standard QR codes
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <FaCheck size={13} />
                      <p className="text-sm ml-2">300 AI QR codes per month</p>
                    </div>
                    <div className="flex items-center mt-2">
                      <FaCheck size={13} />
                      <p className="text-sm ml-2">Unlimited shortened links</p>
                    </div>
                    <div className="flex items-center mt-2">
                      <FaCheck size={13} />
                      <p className="text-sm ml-2">Unlimited scans and clicks</p>
                    </div>
                    {/*<div className="flex items-center mt-2">*/}
                    {/*  <FaCheck size={14} />*/}
                    {/*  <p className="text-sm ml-2">Scan and click tracking</p>*/}
                    {/*</div>*/}
                    <div className="flex items-center mt-2">
                      <FaCheck size={13} />
                      <p className="text-sm ml-2">Full QR customization</p>
                    </div>
                    <div className="flex items-center mt-2">
                      <FaCheck size={13} />
                      <p className="text-sm ml-2">
                        Custom domains and branded links
                      </p>
                    </div>
                    <div className="flex items-center mt-2">
                      <FaCheck size={13} />
                      <p className="text-sm ml-2">
                        Detailed analytics and insights
                      </p>
                    </div>
                    {/*<div className="flex items-center mt-2">*/}
                    {/*  <FaCheck size={14} />*/}
                    {/*  <p className="text-sm ml-2">Geo tracking</p>*/}
                    {/*</div>*/}
                    <div className="flex items-center mt-2">
                      <FaCheck size={13} />
                      <p className="text-sm ml-2">
                        Dedicated support and assistance
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pb-2">
                <Button
                  disabled={isLoading}
                  className="w-full"
                  // onClick={
                  //   subscriptionStatus === "NEW_USER"
                  //     ? handleActivateTrial
                  //     : () => setIsModalOpen(true)
                  // }
                >
                  {isLoading && (
                    <CgSpinner size={16} className="mr-2 animate-spin" />
                  )}
                  {subscriptionStatus === "NEW_USER"
                    ? "Activate 14-day free trial"
                    : "Activate subscription"}
                </Button>
              </CardFooter>
              {subscriptionStatus === "NEW_USER" && (
                <p className="text-muted-foreground text-xs text-center pb-4 italic">
                  No credit card required
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>
      {/*{subscriptionStatus === "INACTIVE" && (*/}
      {/*  <SetupIntentModal*/}
      {/*    clientSecret={clientSecret}*/}
      {/*    isOpen={isModalOpen}*/}
      {/*    setIsOpen={setIsModalOpen}*/}
      {/*  />*/}
      {/*)}*/}
    </>
  );
};
