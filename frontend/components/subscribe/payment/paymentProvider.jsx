"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { PaymentCapture } from "@/components/subscribe/payment/paymentCapture";
import { FiInfo, FiLock } from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchClientSecret = async (accessToken) => {
  try {
    const res = await fetch(`${baseUrl}/subscription/get-client-secret`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.clientSecret;
  } catch {
    return null;
  }
};

export const PaymentProvider = ({
  accessToken,
  team,
  plan,
  billing,
  setIsLoading,
}) => {
  // fetch the client secret from the server
  const [clientSecret, setClientSecret] = useState(null);

  const getClientSecret = async () => {
    const secret = await fetchClientSecret(accessToken);
    setClientSecret(secret);
  };

  useEffect(() => {
    getClientSecret();
    // clean up
    return () => setClientSecret(null);
  }, []);

  const options = {
    clientSecret,
  };

  if (!clientSecret) {
    // return skeleton loader
    return (
      <div className="mt-4 space-y-5">
        <div>
          <p className="text-[13px] font-medium mb-2">Company name</p>
          <Skeleton className="w-full h-[36px]" />
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
          <Skeleton className="w-full h-[36px]" />
        </div>
        <p className="text-muted-foreground text-xs">
          By providing your card information, you allow Spacemon to charge your
          card for future payments in accordance with their terms.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <PaymentCapture
          team={team}
          plan={plan}
          billing={billing}
          secret={clientSecret}
          setIsLoading={setIsLoading}
          accessToken={accessToken}
        />
      </Elements>
    </div>
  );
};
