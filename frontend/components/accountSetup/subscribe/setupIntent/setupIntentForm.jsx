"use client";

import { CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { apiPost } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export const SetupIntentForm = ({ setIsOpen, clientSecret }) => {
  const { handleSubmit } = useForm();
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const onSubmit = async () => {
    // check if stripe and elements are available
    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const result = await stripe.confirmCardSetup(clientSecret, {
      payment_method: {
        card: elements.getElement("card"),
      },
    });

    const { error, setupIntent } = result;
    if (error) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error processing payment",
        description: error.message,
      });
      setIsLoading(false);
      return;
    }

    // send the payment method to the server to get the subscription started
    const paymentMethod = setupIntent.payment_method;

    try {
      await apiPost("/subscribe/activate-subscription", {
        body: { paymentMethod },
      });
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: e.data,
      });
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <CardElement
        options={{
          style: {
            base: {
              color: resolvedTheme === "dark" ? "#fff" : "#000",
              iconColor: resolvedTheme === "dark" ? "#fff" : "#000",
            },
          },
          classes: {
            base: "placeholder:text-muted-foreground border-solid border shadow-sm rounded-md border py-2 px-3 transition-colors text-[#fff] font-[inherit] text-sm",
            focus: "outline-none ring-1 ring-foreground",
          },
        }}
      />
      <div className="mt-8 flex space-x-2 justify-end">
        <Button
          type="button"
          disabled={isLoading}
          variant="secondary"
          size="sm"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={isLoading || !stripe}>
          {isLoading && <CgSpinner className="animate-spin mr-2" size={16} />}
          Confirm and pay now
        </Button>
      </div>
    </form>
  );
};
