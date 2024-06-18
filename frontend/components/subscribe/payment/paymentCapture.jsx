"use client";

import { CardElement } from "@stripe/react-stripe-js";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { FiInfo, FiLock } from "react-icons/fi";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const PaymentCapture = ({
  team,
  plan,
  billing,
  secret,
  setIsLoading,
  accessToken,
}) => {
  const { resolvedTheme } = useTheme();
  const stripe = useStripe();
  const elements = useElements();
  const { handleSubmit, register } = useForm();
  const { toast } = useToast();

  const onSubmit = async ({ company }) => {
    if (!stripe || !elements) return;

    if (!team) {
      toast({
        variant: "destructive",
        title: "No team selected",
        description: "Please select a team to assign plan to",
      });
      return;
    }

    setIsLoading(true);
    const result = await stripe.confirmCardSetup(secret, {
      payment_method: { card: elements.getElement("card") },
    });

    const { error, setupIntent } = result;
    if (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Card error",
        description: error.message,
      });
      return;
    }

    const paymentMethod = setupIntent.payment_method;

    // send data to backend to create subscription
    try {
      const res = await fetch(`${baseUrl}/subscription/create`);
    } catch (e) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error creating subscription",
        description: e.message,
      });
      return;
    }
  };

  return (
    <div className="mt-4">
      <form
        className="space-y-5"
        id="billing-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <p className="text-[13px] font-medium mb-2">Company name</p>
          <Input
            placeholder="Company name (optional)"
            className="fade-in-short-delayed opacity-0"
            {...register("company")}
          />
          <p className="text-muted-foreground text-xs mt-2 flex">
            <FiInfo className="mr-1 mt-0.5 w-3 shrink-0" />
            This will be shown on invoices. Defaults to your team name.
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[13px] font-medium">Payment details</p>
            <div className="flex items-center space-x-1.5">
              <FiLock size={13} />
              <p className="text-xs relative top-[1px]">Secure form</p>
            </div>
          </div>
          <div className="fade-in-short-delayed opacity-0">
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
                  base: "w-full h-[36px] rounded-md focus:border-black hover:cursor-text border bg-transparent px-3 py-[9px] text-[13px] shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground placeholder:text-[13px] outline-none disabled:cursor-not-allowed disabled:opacity-50",
                  focus:
                    "ring border-foreground/50 dark:border-foreground/50 ring-ring/10 dark:ring-ring/20",
                  invalid:
                    "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive dark:focus-visible:border-destructive dark:focus-visible:ring-destructive/50",
                },
              }}
            />
          </div>
        </div>
        <p className="text-muted-foreground text-xs">
          By providing your card information, you allow Spacemon to charge your
          card for future payments in accordance with their terms.
        </p>
      </form>
    </div>
  );
};
