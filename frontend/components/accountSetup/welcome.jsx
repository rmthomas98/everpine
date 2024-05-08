"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { ResendEmail } from "@/components/accountSetup/resendEmail";

const Image = dynamic(() => import("next/image"), { ssr: false });

export const Welcome = ({ email }) => {
  const { resolvedTheme } = useTheme();

  return (
    <div className="p-4 fade-in-short-delayed opacity-0">
      <div className="max-w-[400px] mx-auto">
        <div className="flex justify-center mb-4 h-[25px]">
          <Link href="/" passHref scroll={false}>
            <Image
              src={`/images/logos/logo-${resolvedTheme}-mode.svg`}
              width={100}
              height={26}
              alt="dreamist logo"
              quality={100}
              loading="eager"
            />
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Dreamist</CardTitle>
            <CardDescription>
              Verify your account to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Check your inbox at <span className="font-medium">{email}</span>{" "}
              to activate your account and start using Dreamist.
            </p>
          </CardContent>
          <CardFooter>
            <ResendEmail />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
