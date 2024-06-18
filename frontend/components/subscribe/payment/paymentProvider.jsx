"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { PaymentCapture } from "@/components/subscribe/payment/paymentCapture";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchClientSecret = async (accessToken) => {
  try {
    const res = await fetch(`${baseUrl}/subscribe/get-client-secret`, {
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

export const PaymentProvider = ({ accessToken }) => {
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
    return <div className="mt-8">loading...</div>;
  }

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <PaymentCapture />
      </Elements>
    </div>
  );
};
