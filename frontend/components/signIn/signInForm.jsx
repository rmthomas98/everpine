"use client";

import { ThemedLogo } from "@/components/logo/themedLogo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";
import { BiError, BiLogoGoogle } from "react-icons/bi";
import {
  HiExclamationCircle,
  HiOutlineExclamationCircle,
  HiOutlineLockClosed,
} from "react-icons/hi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isTwoFactor, setIsTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [isResending, setIsResending] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onResend = async () => {
    setIsResending(true);
    const email = getValues("email");
    const res = await fetch(`${baseUrl}/auth/resend-two-factor`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setIsResending(false);
    if (!res.ok) {
      const data = await res.json();
      return toast.error("Error resending code");
    }

    toast.success("Your code has been resent!");
  };

  const onSubmit = async (values) => {
    // check if user has 2fa enabled on first sign in
    if (!isTwoFactor) {
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/auth/check-two-factor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        setIsLoading(false);
        const data = await res.json();
        return toast.error(data);
      }

      // if 2fa is enabled, set state and return
      const { isEnabled } = await res.json();
      if (isEnabled) {
        setIsLoading(false);
        setIsTwoFactor(true);
        return;
      }
    }

    // if 2fa is enabled and code is entered, check code
    if (isTwoFactor) {
      if (twoFactorCode?.length < 6) {
        return toast.error("Please enter your 2fa code");
      }
      setIsLoading(true);
      const res = await fetch(`${baseUrl}/auth/verify-two-factor`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, twoFactorCode }),
      });

      if (!res.ok) {
        setIsLoading(false);
        const data = await res.json();
        return toast.error(data);
      }
    }

    // if 2fa is disabled or 2fa code passed, sign user in
    const options = {
      ...values,
      twoFactorCode,
      redirect: false,
      callbackUrl: "http://localhost:3000/dashboard",
    };
    const { error } = await signIn("credentials", options);
    if (error) {
      setIsLoading(false);
      return toast.error("Invalid email or password");
    }
    router.push("/dashboard");
  };

  const onGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const options = { callbackUrl: "http://localhost:3000/dashboard" };
    const { error } = await signIn("google", options);
    if (error) {
      setIsGoogleLoading(false);
      return toast.error("Failed to sign in with Google");
    }
  };

  return (
    <div
      className={`h-screen ${isTwoFactor ? "min-h-[500px]" : "min-h-[700px]"}`}
    >
      <div className="px-4 py-2 border-b relative z-10">
        <div className="w-full flex justify-between items-center max-w-[1200px] mx-auto">
          <Link href="/" passHref>
            <ThemedLogo />
          </Link>
          <Button asChild variant="outline" size="sm">
            <Link href="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
      <div className="w-full flex justify-center items-center p-4 relative top-[-49px] h-full">
        <div className="max-w-[400px] mx-auto w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="font-semibold text-lg text-center">
              {isTwoFactor
                ? "Two-factor authentication"
                : "Sign in to your account"}
            </p>
            <p className="text-muted-foreground mt-1 text-sm text-center mb-6">
              {!isTwoFactor
                ? "Enter your details to continue to your account"
                : "Enter the code that we sent to your email"}
            </p>
            <div className={`${!isTwoFactor && "hidden"} flex justify-center`}>
              <InputOTP
                maxLength={6}
                value={twoFactorCode}
                onChange={setTwoFactorCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Input
              type="email"
              placeholder="Your email"
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              className={
                errors.email
                  ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive dark:focus-visible:border-destructive dark:focus-visible:ring-destructive/50"
                  : isTwoFactor
                  ? "hidden"
                  : undefined
              }
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1.5 dark:text-red-600">
                Please enter a valid email address
              </p>
            )}
            <Input
              type="password"
              placeholder="Your password"
              {...register("password", { required: true })}
              className={`mt-4 ${
                errors.password
                  ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive dark:focus-visible:border-destructive dark:focus-visible:ring-destructive/50"
                  : isTwoFactor
                  ? "hidden"
                  : undefined
              }`}
            />
            <div
              className={`flex ${
                errors.password ? "justify-between" : "justify-end"
              } items-center mt-1.5`}
            >
              {errors.password && (
                <p className="text-destructive text-xs dark:text-red-600">
                  Please enter your password
                </p>
              )}
              {!isTwoFactor && (
                <Link
                  className="text-xs text-muted-foreground hover:text-foreground transition-all"
                  href="forgot-password"
                >
                  Forgot password?
                </Link>
              )}
            </div>
            <Button
              className="mt-6 w-full"
              type="submit"
              disabled={
                isLoading ||
                isGoogleLoading ||
                (isTwoFactor && twoFactorCode?.length < 6)
              }
            >
              {isLoading ? (
                <CgSpinner className="animate-spin" />
              ) : isTwoFactor ? (
                "Verify"
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
          <div className="flex justify-center">
            <Button
              size="sm"
              variant="ghost"
              className={`mt-2 ${!isTwoFactor && "hidden"}`}
              onClick={onResend}
              disabled={isResending}
            >
              {isResending ? (
                <CgSpinner className="animate-spin" />
              ) : (
                "Resend code"
              )}
            </Button>
          </div>
          <div
            className={`my-4 flex items-center space-x-4 ${
              isTwoFactor && "hidden"
            } transition-all`}
          >
            <Separator className="my-6" />
            <p className="text-muted-foreground text-[11px] font-semibold min-w-fit tracking-wide">
              OR
            </p>
            <Separator className="my-6" />
          </div>
          <div className={`${isTwoFactor && "hidden"}`}>
            <Button
              variant="outline"
              className="w-full"
              disabled={isLoading || isGoogleLoading}
              onClick={onGoogleSignIn}
            >
              {isGoogleLoading ? (
                <CgSpinner className="animate-spin" />
              ) : (
                <>
                  <BiLogoGoogle size={18} className="mr-2" />
                  Sign in with Google
                </>
              )}
            </Button>
          </div>
          <div className={`${isTwoFactor && "hidden"}`}>
            <Button
              variant="outline"
              className="w-full mt-4"
              disabled={isLoading || isGoogleLoading}
            >
              <HiOutlineLockClosed size={18} className="mr-2" />
              Sign in with SSO
            </Button>
          </div>
          {searchParams.get("error") === "AccessDenied" && (
            <div className="mt-4 border border-destructive bg-destructive/5 p-4 rounded-md mb-4 flex items-center space-x-1">
              <HiOutlineExclamationCircle className="text-red-700 relative bottom-[1px]" />
              <p className="text-[13px] text-red-700">
                There was an error signing in to your account
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
