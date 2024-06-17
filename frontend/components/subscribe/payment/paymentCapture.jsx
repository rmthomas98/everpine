"use client";

import { CardElement, PaymentElement } from "@stripe/react-stripe-js";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";

export const PaymentCapture = ({ clientSecret }) => {
  const { resolvedTheme } = useTheme();
  return (
    <div>
      <form className="space-y-4">
        <Input placeholder="Your full name" />
        <CardElement
          options={{
            style: {
              base: {
                color: resolvedTheme === "dark" ? "#fff" : "#000",
                iconColor: resolvedTheme === "dark" ? "#fff" : "#000",
                fontSize: "13px",
                fontFamily: "inherit",
                "::placeholder": {
                  color: resolvedTheme === "dark" ? "#71717A" : "#71717A",
                },
              },
            },
            classes: {
              base: "w-full rounded-md border border-input bg-transparent px-3 py-[9px] text-[13px] shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:text-[13px] outline-none disabled:cursor-not-allowed disabled:opacity-50",
              focus:
                "ring border-foreground/50 dark:border-foreground/50 ring-ring/10 dark:ring-ring/20",
            },
          }}
        ></CardElement>
      </form>
    </div>
  );
};
