"use client";

import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { HiMiniCheck, HiMiniCheckCircle, HiMiniXCircle } from "react-icons/hi2";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tiersList = [
  {
    title: "Free",
    price: { monthly: 0, annually: 0 },
    description: "For personal use.",
    features: [
      "3 QR codes per month",
      "15 links per month",
      "1 landing page",
      "AI-generative QR art",
      "Unlimited scans and clicks",
      "Limited QR customization",
      "1 platform seat",
    ],
    link: "/signup",
  },
  {
    title: "Professional",
    price: { monthly: 15, annually: 12 },
    description: "For startups and small teams.",
    features: [
      "20 QR codes per month",
      "400 links per month",
      "3 landing pages",
      "AI-generative QR art",
      "Unlimited scans and clicks",
      "Full QR customization",
      "5 platform seats",
      "Real time analytics",
      "3 months historical data",
      "1 custom domain",
      "Smart rules",
    ],
    link: "/signup?plan=professional",
  },
  {
    title: "Business",
    price: { monthly: 40, annually: 32 },
    description: "For growing businesses.",
    features: [
      "100 QR codes per month",
      "2,000 links per month",
      "10 landing pages",
      "AI-generative QR art",
      "Unlimited scans and clicks",
      "Full QR customization",
      "15 platform seats",
      "Real time analytics",
      "1 year historical data",
      "3 custom domains",
      "Smart rules",
      "Campaigns",
      "Priority support",
    ],
    link: "/signup?plan=business",
  },
  {
    title: "Enterprise",
    price: { monthly: 120, annually: 96 },
    description: "For large scale operations.",
    features: [
      "500 QR codes per month",
      "10,000 links per month",
      "25 landing pages",
      "AI-generative QR art",
      "Unlimited scans and clicks",
      "Full QR customization",
      "50 platform seats",
      "Real time analytics",
      "3 years historical data",
      "10 custom domains",
      "Smart rules",
      "Campaigns",
      "Dedicated support",
      "Single sign-on (SSO)",
    ],
    link: "/signup?plan=enterprise",
  },
];

export const Tiers = () => {
  const [billingCycle, setBillingCycle] = useState("annually");

  // we will make a bordered square grid background

  return (
    <div className="px-4 py-12 relative">
      {/*<div className="absolute top-[-74px] left-0 w-full h-[calc(100%+74px)] bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 opacity-10 z-[-1]"></div>*/}
      {/*<div className="absolute top-[-74px] left-0 w-full h-[calc(100%+74px)] z-[-1] bg-grid"></div>*/}
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-center">
          <Badge className="w-fit mx-auto mb-4 bg-background" variant="outline">
            Plans and pricing
          </Badge>
        </div>
        <h1 className="text-3xl font-bold text-center">
          Pricing for businesses of all sizes and stages
        </h1>
        <p className="text-muted-foreground mt-2 text-center">
          Connect with your audience and grow your business with our powerful AI
          integrated link management platform.
        </p>
        <div className="mt-8 flex justify-center">
          {/*<div>*/}
          {/*  <p className="mb-2 text-sm text-muted-foreground text-center">*/}
          {/*    Save <span className="text-foreground font-bold">20%</span> when*/}
          {/*    you pay annually*/}
          {/*  </p>*/}
          {/*  <div className="flex items-center space-x-4">*/}
          {/*    <Label>Pay monthly</Label>*/}
          {/*    <Switch*/}
          {/*      checked={billingCycle === "annually"}*/}
          {/*      onCheckedChange={() =>*/}
          {/*        setBillingCycle(*/}
          {/*          billingCycle === "monthly" ? "annually" : "monthly",*/}
          {/*        )*/}
          {/*      }*/}
          {/*    />*/}
          {/*    <Label>Pay annually</Label>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <Tabs
            value={billingCycle}
            onValueChange={setBillingCycle}
            className="w-full max-w-[380px] rounded-full relative"
          >
            <TabsList className="w-full rounded-full relative">
              <TabsTrigger
                value="monthly"
                className="w-full rounded-full text-[13px]"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="annually"
                className="w-full rounded-full text-[13px]"
              >
                Annual (Save 20%)
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="mt-10 flex w-full space-x-4">
          {tiersList.map((tier, index) => (
            <Card
              className={`w-full ${
                index === 2 && "border-foreground border"
              } relative`}
              key={index}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex justify-between items-center">
                  {tier.title}
                  {index === 2 ? (
                    <Badge
                      className={`hover:bg-primary absolute top-[-5px] right-[50%] transform translate-x-[50%] -translate-y-1.5`}
                    >
                      Most popular
                    </Badge>
                  ) : (
                    ""
                  )}
                </CardTitle>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex">
                  <div className="relative">
                    <h2 className="text-3xl font-bold">
                      {billingCycle === "monthly"
                        ? `$${tier.price.monthly}`
                        : `$${tier.price.annually}`}
                    </h2>
                  </div>
                  <span className="text-muted-foreground ml-1.5 mt-3 text-sm">
                    /month
                  </span>
                </div>
                <div>
                  <p
                    className={`text-xs text-muted-foreground mt-0.5 ${
                      billingCycle === "annually"
                        ? "opacity-1"
                        : "opacity-0 pointer-events-none"
                    } transition-all duration-300`}
                  >
                    {index === 0
                      ? `No credit card required`
                      : `Billed annually at ${(
                          tier.price.annually * 12
                        ).toLocaleString("en-us", {
                          style: "currency",
                          currency: "USD",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}`}
                  </p>
                </div>
                <div
                  className={`${
                    billingCycle === "annually" ? "mt-5" : "mt-0"
                  } mb-4 transition-all duration-300`}
                >
                  <Button
                    className={`w-full`}
                    variant={index === 2 ? "default" : "outline"}
                    asChild
                  >
                    <Link
                      href={
                        index === 0
                          ? tier.link
                          : `${tier.link}&billing=${
                              billingCycle === "monthly" ? "month" : "annual"
                            }`
                      }
                      passHref
                    >
                      Get started
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-col">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-center mt-1.5">
                      <HiMiniCheckCircle size={16} className={`relative`} />
                      <p
                        className={`text-[13px] ml-2 font-medium ${
                          index >= 3 && "text-muted-foreground font-normal"
                        }`}
                      >
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mt-4 flex items-center justify-between">
          <CardHeader>
            {/*<div className="flex mb-4 justify-center">*/}
            {/*  <Badge className="w-fit" variant="outline">*/}
            {/*    Custom plan*/}
            {/*  </Badge>*/}
            {/*</div>*/}
            <CardTitle>Need a custom plan for your business?</CardTitle>
            <CardDescription>
              Contact us to discuss your requirements and get a custom plan
              tailored to your needs.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-4 px-6">
            <Button>Contact sales</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
