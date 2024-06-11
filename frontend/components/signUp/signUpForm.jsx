"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BiLogoGoogle } from "react-icons/bi";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export const SignUpForm = () => {
  const { toast } = useToast();

  return (
    <div className="max-w-[400px] w-full mx-auto">
      <p className="font-semibold text-lg text-center">Create your account</p>
      <p className="text-muted-foreground mt-1 text-sm text-center">
        Enter your details below to get started
      </p>
      <form className="mt-6">
        <Input placeholder="Work email" className="w-full" type="email" />
        <Input placeholder="Password" className="w-full mt-4" type="password" />
        <Button className="mt-6 w-full">Sign up with email</Button>
      </form>
      <div className="my-4 flex items-center space-x-4">
        <Separator className="my-6" />
        <p className="text-muted-foreground text-[11px] font-semibold min-w-fit tracking-wide">
          OR
        </p>
        <Separator className="my-6" />
      </div>
      <div>
        <Button variant="outline" className="w-full">
          <BiLogoGoogle size={20} className="mr-2" />
          Sign up with Google
        </Button>
      </div>
      <div className="mt-6 max-w-[340px] mx-auto">
        <p className="text-xs text-muted-foreground text-center leading-5">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms of service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy policy
          </Link>
        </p>
      </div>
    </div>
  );
};
