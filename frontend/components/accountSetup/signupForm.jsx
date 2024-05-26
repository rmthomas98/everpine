"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { HiMiniCheck } from "react-icons/hi2";
import { Label } from "@/components/ui/label";
import { CgSpinner } from "react-icons/cg";
import { apiPost } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ThemedLogo } from "@/components/ThemedLogo";

export const SignupForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setIsLoading(true);

    // make call to backend to create user and return auth cookie back to client
    const { email, password } = values;

    try {
      await apiPost("/user/create", { body: { email, password } });
      // redirect to account created page
      router.push("/dashboard");
    } catch (e) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Error creating your account",
        description: e.data ? e.data : "Please try again",
      });
    }
  };

  return (
    <div className="p-4 fade-in-short-delayed opacity-0">
      <div className="max-w-[400px] mx-auto">
        <div className="flex justify-center">
          <Link href="/" passHref scroll={false}>
            <ThemedLogo />
          </Link>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Get started for free</CardTitle>
            <CardDescription>
              Create an account to start using Dreamist
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
              {/*<div>*/}
              {/*  <Input*/}
              {/*    placeholder="Your email"*/}
              {/*    type="email"*/}
              {/*    {...register("email", { required: true })}*/}
              {/*  />*/}
              {/*</div>*/}
              {/*<div className="mt-4">*/}
              {/*  <Input*/}
              {/*    placeholder="Your password"*/}
              {/*    type="password"*/}
              {/*    {...register("password", {*/}
              {/*      required: true,*/}
              {/*      minLength: 8,*/}
              {/*    })}*/}
              {/*  />*/}
              {/*</div>*/}
              <div
                className={`relative ${
                  errors.email ? "mb-6" : "mb-4"
                } transition-all duration-300`}
              >
                <Label htmlFor="email">Email</Label>
                <Input
                  className="mt-1"
                  type="email"
                  id="email"
                  placeholder="Your email"
                  {...register("email", {
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  })}
                />
                <p
                  className={`text-xs text-red-600 absolute -bottom-5 transition-all duration-300 ${
                    errors.email
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  Enter a valid email address
                </p>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  className="mt-1"
                  type="password"
                  id="password"
                  placeholder="Your password"
                  {...register("password", { required: true, minLength: 8 })}
                />
                <div className="flex items-center mt-1.5">
                  <p
                    className={`text-xs ${
                      errors.password
                        ? "text-red-600"
                        : watch("password")?.length >= 8
                        ? "text-green-600"
                        : "text-muted-foreground"
                    } transition-all duration-300`}
                  >
                    Password must be at least 8 characters
                  </p>
                  <HiMiniCheck
                    className={`text-green-600 ml-1 ${
                      watch("password")?.length >= 8
                        ? "opacity-100"
                        : "opacity-0"
                    } transition-all duration-300`}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <CgSpinner className="animate-spin mr-2" size={16} />
                ) : (
                  ""
                )}
                Create account
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="flex items-center justify-center mt-4">
          <p className="text-xs text-center text-muted-foreground">
            Already have an account?
          </p>
          <Link
            href="/login"
            className="text-xs ml-1 text-primary transition-all hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
