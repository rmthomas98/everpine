"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { Skeleton } from "@/components/ui/skeleton";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const PasswordCard = ({ accessToken, user, setCredentials }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!user) return;
    setPassword(user.password);
  }, [user]);

  const onSubmit = async (values) => {
    if (!password) {
      if (values.currentPassword !== values.newPassword) {
        return toast.error("Passwords do not match");
      }
    }

    setIsLoading(true);
    const res = await fetch(`${baseUrl}/user/update-password`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    setIsLoading(false);
    if (!res.ok) {
      const data = await res.json();
      return toast.error(data);
    }

    setPassword(true);
    if (!user.password) setCredentials(true);
    reset({ currentPassword: "", newPassword: "" });
    toast.success("Your password have been updated");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Your password</CardTitle>
        <CardDescription>You can update your password here.</CardDescription>
      </CardHeader>
      <CardContent>
        {user ? (
          <Input
            className={`max-w-[400px] fade-in-short-delayed opacity-0 ${
              errors.currentPassword
                ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive dark:focus-visible:border-destructive dark:focus-visible:ring-destructive/50"
                : undefined
            }`}
            placeholder={password ? "Current password" : "Create a password"}
            type="password"
            {...register("currentPassword", { required: true, minLength: 8 })}
          />
        ) : (
          <Skeleton className="w-full max-w-[400px] rounded-md h-[36px]" />
        )}
        {errors.currentPassword?.type === "required" && (
          <p className="text-destructive text-xs dark:text-red-600 mt-1.5">
            {password
              ? "Please enter your current password"
              : "Please create a password"}
          </p>
        )}
        {errors.currentPassword?.type === "minLength" && (
          <p className="text-destructive text-xs dark:text-red-600 mt-1.5">
            Password must be at least 8 characters
          </p>
        )}
        {user ? (
          <Input
            className={`mt-4 max-w-[400px] fade-in-short-delayed opacity-0 ${
              errors.newPassword
                ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive dark:focus-visible:border-destructive dark:focus-visible:ring-destructive/50"
                : undefined
            }`}
            placeholder={password ? "New password" : "Confirm password"}
            type="password"
            {...register("newPassword", { required: true, minLength: 8 })}
          />
        ) : (
          <Skeleton className="w-full max-w-[400px] rounded-md h-[36px] mt-4" />
        )}
        {errors.newPassword?.type === "required" && (
          <p className="text-destructive text-xs dark:text-red-600 mt-1.5">
            {password
              ? "Please enter your new password"
              : "Please confirm your password"}
          </p>
        )}
        {errors.newPassword?.type === "minLength" && (
          <p className="text-destructive text-xs dark:text-red-600 mt-1.5">
            Password must be at least 8 characters
          </p>
        )}
      </CardContent>
      <CardFooter className="justify-between items-center py-3 border-t">
        <p className="text-[13px] text-muted-foreground">
          Must be at least 8 characters
        </p>
        <Button
          size="sm"
          className="w-[74px]"
          disabled={isLoading || !user}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? <CgSpinner className="animate-spin" /> : "Confirm"}
        </Button>
      </CardFooter>
    </Card>
  );
};
