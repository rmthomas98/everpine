"use cient";

import { BiCheckCircle, BiSolidParty } from "react-icons/bi";
import { HiMiniCheckCircle } from "react-icons/hi2";
import Link from "next/link";
import { ThemedLogo } from "@/components/logo/themedLogo";
import { Button } from "@/components/ui/button";
import { HiArrowSmRight } from "react-icons/hi";

export const PaymentSuccess = () => {
  return (
    <>
      <div className="border-b px-4 py-2 sticky top-0 bg-background z-[999]">
        <div className="flex justify-between items-center max-w-[1000px] mx-auto">
          <Link href="/" passHref>
            <ThemedLogo />
          </Link>
          <Button size="sm" asChild>
            <Link href="/dashboard">
              Dashboard
              <HiArrowSmRight className="ml-1" size={16} />
            </Link>
          </Button>
        </div>
      </div>
      <div className="p-4 mt-10 max-w-[420px] mx-auto fade-in-short-delayed opacity-0">
        <div className="flex flex-col items-center space-y-2">
          <BiSolidParty size={24} />
          <p className="text-lg font-bold">Payment successful</p>
          <p className="text-muted-foreground text-sm text-center">
            Your payment has been successfully processed and your subscription
            is now active.
          </p>
          <div className="pt-2">
            <Button size="sm" asChild>
              <Link href="/dashboard">
                Continue to dashboard
                <HiArrowSmRight className="ml-2" size={16} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
