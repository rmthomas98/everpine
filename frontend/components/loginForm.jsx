"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ThemedLogo } from "@/components/themedLogo";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { CgSpinner } from "react-icons/cg";
import { apiPost } from "@/lib/api";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      // make call to backend to login user and return auth cookie back to client
      await apiPost("/auth/signin", { body: data });
      router.push("/dashboard");
    } catch (e) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error signing in",
        description: e.data ? e.data : "Please try again",
      });
    }
  };

  return (
    <div className="p-4 fade-in-short-delayed opacity-0">
      <div className="max-w-[400px] mx-auto">
        <div className="flex justify-center mb-4">
          <Link href="/" passHref scroll={false}>
            <ThemedLogo />
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Sign in to your account</CardTitle>
              <CardDescription>
                Enter your email and password to sign in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`relative ${
                  errors.email ? "mb-6" : "mb-4"
                } transition-all duration-300`}
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Your email"
                  {...register("email", { required: true })}
                  tabIndex="1"
                />
                <p
                  className={`text-xs text-rose-600 absolute -bottom-5 transition-all duration-300 ${
                    errors.email
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  Please enter your email
                </p>
              </div>
              <div
                className={`relative ${
                  errors.password && "mb-4"
                } transition-all duration-300`}
              >
                <div className="flex items-center justify-between mb-1">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs hover:text-neutral-600 transition-all"
                    tabIndex="3"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  type="password"
                  id="password"
                  placeholder="Your password"
                  {...register("password", { required: true })}
                  tabIndex="2"
                />
                <p
                  className={`text-xs text-rose-600 absolute -bottom-5 transition-all duration-300 ${
                    errors.password
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  Please enter your password
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={isLoading}>
                {isLoading && (
                  <CgSpinner size={16} className="mr-2 animate-spin" />
                )}
                Sign in
              </Button>
            </CardFooter>
          </Card>
        </form>
        <div className="flex items-center justify-center mt-4">
          <p className="text-xs text-center">Don&#39;t have an account?</p>
          <Link
            href="/signup"
            className="text-xs ml-1 font-medium hover:text-neutral-600 transition-all"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};
