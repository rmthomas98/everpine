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
import { HiMiniCheck, HiMiniCheckCircle } from "react-icons/hi2";
import Link from "next/link";

const tiersList = [
  {
    title: "Free",
    price: { monthly: 0, annually: 0 },
    description: "For personal use.",
    features: [
      "3 QR codes per month",
      "15 links per month",
      "Unlimited scans and clicks",
      "Limited QR customization",
    ],
    link: "/signup",
  },
  {
    title: "Professional",
    price: { monthly: 10, annually: 8 },
    description: "For startups and small teams.",
    features: [
      "10 QR codes per month",
      "50 links per month",
      "Unlimited scans and clicks",
      "Full QR customization",
      "Detailed analytics and insights",
      "Unlimited team members with roles",
      "Dedicated support and assistance",
    ],
    link: "/signup?plan=professional",
  },
  {
    title: "Business",
    price: { monthly: 20, annually: 16 },
    description: "For growing businesses.",
    features: [
      "20 QR codes per month",
      "100 links per month",
      "Unlimited scans and clicks",
      "Full QR customization",
      "Custom domains and branded links",
      "Detailed analytics and insights",
      "Unlimited team members with roles",
      "Dedicated support and assistance",
    ],
    link: "/signup?plan=business",
  },
  {
    title: "Enterprise",
    price: { monthly: 120, annually: 100 },
    description: "For large scale operations.",
    features: [
      "50 QR codes per month",
      "Unlimited links per month",
      "Unlimited scans and clicks",
      "Full QR customization",
      "Custom domains and branded links",
      "Detailed analytics and insights",
      "Unlimited team members with roles",
      "Dedicated support and assistance",
    ],
    link: "/signup?plan=enterprise",
  },
];

export const Tiers = () => {
  const [billingCycle, setBillingCycle] = useState("annually");

  return (
    <div className="px-4 py-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex justify-center">
          <Badge className="w-fit mx-auto mb-4" variant="outline">
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
        <div className="mt-6 flex justify-center">
          <div>
            <p className="mb-2 text-sm text-muted-foreground text-center">
              Save <span className="text-foreground font-bold">20%</span> when
              you pay annually
            </p>
            <div className="flex items-center space-x-4">
              <Label>Pay monthly</Label>
              <Switch
                checked={billingCycle === "annually"}
                onCheckedChange={() =>
                  setBillingCycle(
                    billingCycle === "monthly" ? "annually" : "monthly",
                  )
                }
              />
              <Label>Pay annually</Label>
            </div>
          </div>
        </div>
        <div className="mt-8 flex w-full space-x-4">
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
                  <h2 className="text-3xl font-bold">
                    {billingCycle === "monthly"
                      ? `$${tier.price.monthly}`
                      : `$${tier.price.annually}`}
                  </h2>
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
                    } transition-all`}
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
                  } mb-4 transition-all`}
                >
                  <Button
                    className={`w-full`}
                    variant={index === 2 ? "default" : "secondary"}
                    asChild
                  >
                    <Link
                      href={
                        index === 0
                          ? tier.link
                          : `${tier.link}&billing=${billingCycle}`
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
                      <HiMiniCheck
                        size={15}
                        className="relative bottom-[1px]"
                      />
                      <p className={`text-[13px] ml-2 text-muted-foreground`}>
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
