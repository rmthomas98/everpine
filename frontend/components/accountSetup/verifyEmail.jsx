"use client";

import { useTheme } from "next-themes";
import { apiPost } from "@/lib/api";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const Image = dynamic(() => import("next/image"));

export const VerifyEmail = ({ token }) => {
  const { resolvedTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onVerify = async () => {
    setIsLoading(true);

    try {
      await apiPost(`/account-setup/verify-email/${token}`);
      router.push("/dashboard");
      router.refresh();
    } catch (e) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error verifying your account",
        description: e.data ? e.data : "Please try again",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center mb-4">
        <div className="h-[25px]">
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
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Verify your account</CardTitle>
          <CardDescription>
            Click the button below to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="sm" onClick={onVerify} disabled={isLoading}>
            {isLoading && <CgSpinner className="animate-spin mr-2" size={16} />}
            Verify
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
