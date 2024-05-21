"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { SetupIntentForm } from "@/components/accountSetup/subscribe/setupIntent/setupIntentForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export const SetupIntentModal = ({ isOpen, setIsOpen, clientSecret }) => {
  const options = {
    // passing the client secret obtained from the server
    clientSecret,
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-left">
            Activate your subscription
          </DialogTitle>
          <DialogDescription className="text-left">
            Please enter your payment details to activate your subscription. You
            will be charged $10.00 on a monthly basis. You can cancel anytime.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Elements stripe={stripePromise} options={options}>
            <SetupIntentForm
              setIsOpen={setIsOpen}
              clientSecret={clientSecret}
            />
          </Elements>
        </div>
      </DialogContent>
    </Dialog>
  );
};
