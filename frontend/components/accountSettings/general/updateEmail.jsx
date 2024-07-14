"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { CgSpinner } from "react-icons/cg";

export const UpdateEmailDialog = ({
  isOpen,
  setIsOpen,
  accessToken,
  setEmail,
  setIsEmailVerified,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isOpen) reset();
  }, [isOpen]);

  const onSubmit = async (values) => {
    // make call to backend to update email and send verification email
    setIsLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update-email`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      },
    );

    setIsLoading(false);
    if (!res.ok) {
      const data = await res.json();
      return toast.error(data);
    }
    setIsOpen(false);
    setEmail(values.email);
    setIsEmailVerified(false);
    toast.success("Verification email sent!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent
          onInteractOutside={(e) => isLoading && e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Update your email</DialogTitle>
            <DialogDescription>
              We will send a verification email to your new email address.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              type="email"
              placeholder="Your new email"
              className={`${
                errors.email
                  ? "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive dark:focus-visible:border-destructive dark:focus-visible:ring-destructive/50"
                  : undefined
              }`}
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            {errors.email && (
              <p className="text-destructive text-xs mt-1.5 dark:text-red-600">
                Please enter a valid email
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              size="sm"
              variant="outline"
              className="w-[74px]"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="w-[74px]"
              disabled={isLoading}
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? <CgSpinner className="animate-spin" /> : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
