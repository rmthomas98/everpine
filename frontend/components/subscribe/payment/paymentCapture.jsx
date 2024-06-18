"use client";

import { CardElement } from "@stripe/react-stripe-js";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { FiInfo } from "react-icons/fi";

export const PaymentCapture = ({ clientSecret }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="mt-8 fade-in-short-delayed opacity-0">
      <p className="font-semibold">Billing information</p>
      <p className="text-muted-foreground mt-1 text-sm">
        Enter your billing info to complete the subscription.
      </p>
      <form className="space-y-5 mt-4">
        <div>
          <p className="text-[13px] font-medium mb-2">Company name</p>
          <Input placeholder="Company name (optional)" />
          <p className="text-muted-foreground text-xs mt-2 flex">
            <FiInfo className="mr-1 mt-0.5 w-3 shrink-0" />
            This will be shown on invoices. Defaults to your team name.
          </p>
        </div>
        <div>
          <p className="text-[13px] font-medium mb-2">Payment details</p>
          <CardElement
            options={{
              style: {
                base: {
                  color: resolvedTheme === "dark" ? "#fff" : "#000",
                  iconColor: resolvedTheme === "dark" ? "#fff" : "#000",
                  fontSize: "13px",
                  "::placeholder": {
                    color: resolvedTheme === "light" ? "#71717A" : "#A1A1AA",
                  },
                },
              },
              classes: {
                base: "w-full rounded-md focus:border-black hover:cursor-text border bg-transparent px-3 py-[9px] text-[13px] shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:text-[13px] outline-none disabled:cursor-not-allowed disabled:opacity-50",
                focus:
                  "ring border-foreground/50 dark:border-foreground/50 ring-ring/10 dark:ring-ring/20",
              },
            }}
          />
        </div>
      </form>
    </div>
  );
};
