"use client";

import { Button } from "@/components/ui/button";
import { CgSpinner } from "react-icons/cg";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export const ResendEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onResend = async () => {
    setIsLoading(true);
  };

  return (
    <div>
      <Button
        size="sm"
        variant="outline"
        onClick={onResend}
        disabled={isLoading}
      >
        {isLoading && <CgSpinner className="animate-spin mr-1" size={16} />}
        Resend email
      </Button>
    </div>
  );
};
