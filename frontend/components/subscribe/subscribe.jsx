"use client";

import { useState, useEffect } from "react";
import { ThemedLogo } from "@/components/themedLogo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HiArrowSmRight } from "react-icons/hi";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { plans } from "@/data/plans";
import { TeamPicker } from "@/components/teamPicker";
import { Separator } from "@/components/ui/separator";
import { HiMiniCheckCircle } from "react-icons/hi2";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const getTeams = async (accessToken) => {
  const res = await fetch(`${baseUrl}/team/roles`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) return [];
  return await res.json();
};

export const Subscribe = ({ accessToken, plan, billing }) => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [billingCycle, setBillingCycle] = useState(billing);
  const totalAnnualPrice = plans[plan.toLowerCase()].price.annual * 12;
  const totalMonthlyPrice = plans[plan.toLowerCase()].price.month;

  useEffect(() => {
    getTeams(accessToken).then((data) => {
      setTeams(data);
      setSelectedTeam(data[0]);
    });

    return () => setTeams([]);
  }, []);

  return (
    <>
      <div className="border-b px-4 py-2 sticky top-0 bg-background">
        <div className="flex justify-between items-center max-w-[1000px] mx-auto">
          <Link href="/" passHref>
            <ThemedLogo />
          </Link>
          <Button size="sm" asChild>
            <Link href="/dashboard">
              Dashboard
              <HiArrowSmRight className="ml-1" size={16} />
            </Link>
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="max-w-[1000px] mx-auto">
          <div className="w-full flex mt-4">
            <div className="w-3/4 mr-10">
              <p className="text-xl font-bold">
                Get started with{" "}
                {plan.slice(0, 1).toUpperCase() + plan.slice(1)}
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                You are about to subscribe to the{" "}
                {plan.slice(0, 1).toUpperCase() + plan.slice(1)} plan. You will
                be charged on either a monthly or annual basis, depending on
                your selection. You can cancel anytime.
              </p>
            </div>
            <div className="w-1/2 min-w-[340px]">
              <Tabs
                value={billingCycle}
                onValueChange={setBillingCycle}
                className="w-full relative mb-4"
              >
                <TabsList className="w-full relative">
                  <TabsTrigger value="month" className="w-full text-[13px]">
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger value="annual" className="w-full text-[13px]">
                    Annual (Save 20%)
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Purchase summary</CardTitle>
                  <CardDescription className="flex items-center justify-between mb-6">
                    <span>
                      {plan.slice(0, 1).toUpperCase() + plan.slice(1)} plan
                    </span>
                    {billingCycle === "month" ? (
                      <span>${totalMonthlyPrice} / month</span>
                    ) : (
                      <span>
                        {totalAnnualPrice.toLocaleString("en-us", {
                          maximumFractionDigits: 0,
                          style: "currency",
                          currency: "usd",
                        })}{" "}
                        / year
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <div className="px-6">
                  <Separator />
                </div>
                <CardContent className="py-3">
                  <p className="text-sm font-medium mb-2">Plan details</p>
                  {plans[plan.toLowerCase()].planDetails.map(
                    (feature, index) => (
                      <div key={index} className="flex items-center mt-1">
                        <HiMiniCheckCircle size={16} className={`relative`} />
                        <p
                          className={`text-[13px] ml-2 font-normal text-muted-foreground`}
                        >
                          {feature}
                        </p>
                      </div>
                    ),
                  )}
                </CardContent>
                <div className="px-6">
                  <Separator />
                </div>
                <CardFooter className="pt-3">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-sm font-medium">Billed now</p>
                    {billingCycle === "month" ? (
                      <p className="text-sm font-medium">
                        {plans[plan.toLowerCase()].price[
                          billingCycle
                        ].toLocaleString("en-us", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                          currency: "usd",
                          style: "currency",
                        })}
                      </p>
                    ) : (
                      <p className="text-sm font-medium">
                        {(
                          plans[plan.toLowerCase()].price[billingCycle] * 12
                        ).toLocaleString("en-us", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                          currency: "usd",
                          style: "currency",
                        })}
                      </p>
                    )}
                  </div>
                </CardFooter>
              </Card>
              <div className="mt-4">
                <TeamPicker label={"Assign to..."} />
              </div>
              <Button className="mt-4 w-full">Complete purchase</Button>
              <p className="text-xs text-muted-foreground text-center leading-5">
                You will be charged
                {} annualy. You can cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
