"use client";

import {
  Card,
  CardContent,
  CardTitle,
  CardFooter,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FaCheck } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export const Tiers = () => {
  const [billingCycle, setBillingCycle] = useState("annually");

  return (
    <div className="py-4">
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
            Save <span className="text-foreground font-bold">20%</span> when you
            pay annually
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
      <div className="mt-8 flex w-full">
        <Card className="max-[500px]:w-full">
          <CardHeader className="pb-4">
            <CardTitle className="flex justify-between items-center">
              Free{" "}
              <Badge
                className={`${
                  billingCycle === "annually" ? "opacity-100" : "opacity-0"
                } transition-all`}
              >
                Save 20%
              </Badge>
            </CardTitle>
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
                  <p className="text-sm ml-2">Unlimited standard QR codes</p>
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
                <div className="flex itesm-center mt-2">
                  <FaCheck size={13} />
                  <p className="text-sm ml-2">
                    Unlimited team members with roles
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
          <CardFooter>
            <Button className="w-full">Select plan</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
