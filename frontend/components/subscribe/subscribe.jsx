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
import { HiMiniCheckCircle } from "react-icons/hi2";
import { TeamSelector } from "@/components/subscribe/teamSelector/teamSelector";
import { PaymentProvider } from "@/components/subscribe/payment/paymentProvider";
import { CgSpinner } from "react-icons/cg";

export const Subscribe = ({ accessToken, plan: initialPlan, billing }) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [billingCycle, setBillingCycle] = useState(billing);
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState(initialPlan);

  const totalAnnualPrice = plans[plan].price.annual * 12;
  const totalMonthlyPrice = plans[plan].price.month;

  return (
    <>
      <div className="border-b px-4 py-2 sticky top-0 bg-background z-[999]">
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
      <div className="p-4 pb-12">
        <div className="max-w-[1000px] mx-auto">
          <div className="w-full flex mt-4 max-[850px]:flex-col">
            <div className="w-3/4 min-[850px]:mr-10 max-[850px]:w-full">
              {/*<p className="text-xl font-bold">*/}
              {/*  Get started with{" "}*/}
              {/*  {plan.slice(0, 1).toUpperCase() + plan.slice(1)}*/}
              {/*</p>*/}
              {/*<p className="text-muted-foreground mt-2 text-sm">*/}
              {/*  You are about to subscribe to the{" "}*/}
              {/*  {plan.slice(0, 1).toUpperCase() + plan.slice(1)} plan. You will*/}
              {/*  be charged on either a monthly or annual basis, depending on*/}
              {/*  your selection. You can cancel anytime.*/}
              {/*</p>*/}
              <p className="text-xl font-bold">Get started with Spacemon</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Start collaborating with increased limits and features. Choose
                the plan that suits your needs and get started with your
                subscription. You can cancel anytime.
              </p>
              <p className="font-semibold mt-8">
                Choose a plan and billing cycle
              </p>
              <p className="text-muted-foreground mt-1 text-sm">
                You can see the full feature comparison{" "}
                <Link href="/pricing" target="_blank" className="underline">
                  here
                </Link>
              </p>
              <Tabs
                value={billingCycle}
                onValueChange={setBillingCycle}
                className="w-full relative mt-4"
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
              <div className="grid grid-cols-[1fr_1fr_1fr] gap-3 mt-4 max-[600px]:grid-cols-1">
                {Object.values(plans)
                  .slice(1, 4)
                  .map((item, index) => (
                    <Card
                      key={index}
                      onClick={() => setPlan(item.name)}
                      className={`cursor-pointer transition-all ${
                        plan === item.name
                          ? "border-foreground"
                          : "hover:border-foreground/30"
                      }`}
                    >
                      <CardHeader className="p-4">
                        <div className="flex justify-between items-center">
                          <CardTitle className="capitalize text-[15px]">
                            {item.name}
                          </CardTitle>
                          <div
                            className={`h-4 w-4 rounded-full flex items-center justify-center border ${
                              plan === item.name && "shadow-inner"
                            } transition-all`}
                          >
                            <div
                              className={`bg-foreground rounded-full transition-all ${
                                plan === item.name
                                  ? "h-1.5 w-1.5 opacity-100"
                                  : "h-0 w-0 opacity-0"
                              }`}
                            ></div>
                          </div>
                        </div>
                        <CardDescription>
                          {billingCycle === "month" &&
                            `$${item.price[billingCycle]}/month`}
                          {billingCycle === "annual" &&
                            `$${(item.price[billingCycle] * 12).toLocaleString(
                              "en-us",
                              {
                                maximumFractionDigits: 0,
                              },
                            )}/year`}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
              </div>
              <p className="font-semibold mt-8">Billing information</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Enter your billing info to complete the subscription.
              </p>
              <PaymentProvider
                accessToken={accessToken}
                team={selectedTeam}
                plan={plan}
                billing={billingCycle}
                setIsLoading={setIsLoading}
              />
            </div>
            <div>
              <div className="w-1/2 min-w-[320px] max-[850px]:w-full max-[850px]:mt-8 sticky top-[81px]">
                {/*<Tabs*/}
                {/*  value={billingCycle}*/}
                {/*  onValueChange={setBillingCycle}*/}
                {/*  className="w-full relative mb-4"*/}
                {/*>*/}
                {/*  <TabsList className="w-full relative">*/}
                {/*    <TabsTrigger value="month" className="w-full text-[13px]">*/}
                {/*      Monthly*/}
                {/*    </TabsTrigger>*/}
                {/*    <TabsTrigger value="annual" className="w-full text-[13px]">*/}
                {/*      Annual (Save 20%)*/}
                {/*    </TabsTrigger>*/}
                {/*  </TabsList>*/}
                {/*</Tabs>*/}
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
                    {/*<Separator />*/}
                    <div className="w-full border-b border-dashed"></div>
                  </div>
                  <CardContent
                    className={`py-3 transition-all ${
                      plan === "enterprise" ? "h-[212.5px]" : "h-[189px]"
                    }`}
                  >
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
                    {/*<Separator decorative="dashed" />*/}
                    <div className="w-full border-b border-dashed"></div>
                  </div>
                  <CardFooter className="pt-3">
                    <div className="flex items-center justify-between w-full">
                      <p className="text-sm font-medium">Billed now</p>
                      {billingCycle === "month" ? (
                        <p className="text-sm font-medium">
                          {totalMonthlyPrice.toLocaleString("en-us", {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                            currency: "usd",
                            style: "currency",
                          })}
                        </p>
                      ) : (
                        <p className="text-sm font-medium">
                          {totalAnnualPrice.toLocaleString("en-us", {
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
                  <TeamSelector
                    accessToken={accessToken}
                    setSelectedTeam={setSelectedTeam}
                  />
                </div>
                <Button
                  className="mt-4 w-full"
                  disabled={isLoading}
                  form="billing-form"
                  type="submit"
                >
                  {isLoading ? (
                    <CgSpinner className="animate-spin" />
                  ) : (
                    "Complete purchase"
                  )}
                </Button>
                <p className="text-xs text-muted-foreground text-center leading-5 mt-4">
                  You will be charged{" "}
                  {billingCycle === "month"
                    ? `${totalMonthlyPrice.toLocaleString("en-us", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                        currency: "usd",
                        style: "currency",
                      })} monthly. You can canel anytime.`
                    : `${totalAnnualPrice.toLocaleString("en-us", {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2,
                        currency: "usd",
                        style: "currency",
                      })} annually. You can cancel anytime.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
