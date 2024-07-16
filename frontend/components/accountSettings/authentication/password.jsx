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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const PasswordCard = ({ accessToken }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values) => {
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
        <Input
          className={`max-w-[400px] ${
            errors.currentPassword
              ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive dark:focus-visible:border-destructive dark:focus-visible:ring-destructive/50"
              : undefined
          }`}
          placeholder="Current password"
          type="password"
          {...register("currentPassword", { required: true })}
        />
        {errors.currentPassword && (
          <p className="text-destructive text-xs dark:text-red-600 mt-1.5">
            Please enter your password
          </p>
        )}
        <Input
          className={`mt-4 max-w-[400px] ${
            errors.newPassword
              ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive dark:focus-visible:border-destructive dark:focus-visible:ring-destructive/50"
              : undefined
          }`}
          placeholder="New password"
          type="password"
          {...register("newPassword", { required: true, minLength: 8 })}
        />
        {errors.newPassword?.type === "required" && (
          <p className="text-destructive text-xs dark:text-red-600 mt-1.5">
            Please enter your new password
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
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? <CgSpinner className="animate-spin" /> : "Confirm"}
        </Button>
      </CardFooter>
    </Card>
  );
};
