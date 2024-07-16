"use client";

import { ThemedLogo } from "@/components/themedLogo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";
import { BiLogoGoogle } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const SignInForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setIsLoading(true);
    const options = { ...values, redirect: false };
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
    <div className="h-screen min-h-[600px]">
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
      <div className="h-full w-full flex justify-center items-center p-4 relative top-[-49px]">
        <div className="max-w-[400px] mx-auto w-full">
          <p className="font-semibold text-lg text-center">
            Sign in to your account
          </p>
          <p className="text-muted-foreground mt-1 text-sm text-center">
            Enter your details to continue to your account
          </p>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
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
              <Link
                className="text-xs text-muted-foreground hover:text-foreground transition-all"
                href="forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              className="mt-6 w-full"
              type="submit"
              disabled={isLoading || isGoogleLoading}
            >
              {isLoading ? <CgSpinner className="animate-spin" /> : "Sign in"}
            </Button>
          </form>
          <div className="my-4 flex items-center space-x-4">
            <Separator className="my-6" />
            <p className="text-muted-foreground text-[11px] font-semibold min-w-fit tracking-wide">
              OR
            </p>
            <Separator className="my-6" />
          </div>
          <div>
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
          <div>
            <Button
              variant="outline"
              className="w-full mt-4"
              disabled={isLoading || isGoogleLoading}
            >
              <HiOutlineLockClosed size={18} className="mr-2" />
              Sign in with SSO
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
