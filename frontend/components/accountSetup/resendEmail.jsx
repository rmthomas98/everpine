"use client";

import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { apiGet } from "@/lib/api";

export const ResendEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onResend = async () => {
    setIsLoading(true);
    try {
      await apiGet("/account-setup/resend-email");
      setIsLoading(false);
      toast({
        title: "Email has been resent!",
        description: "Please check your inbox.",
      });
    } catch (e) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: e.data,
      });
    }
  };

  return (
    <div>
      <Button size="sm" onClick={onResend} disabled={isLoading}>
        {isLoading && <CgSpinner className="animate-spin mr-1" size={16} />}
        Resend email
      </Button>
    </div>
  );
};
