"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SignUpForm = () => {
  return (
    <div className="max-w-[400px] w-full mx-auto">
      <p className="font-semibold text-lg text-center">Create an account</p>
      <p className="text-muted-foreground mt-1 text-sm text-center">
        Get started with Spacemon today
      </p>
      <form className="mt-6">
        <Input placeholder="Work email" className="w-full" />
        <Input placeholder="Password" className="w-full mt-4" />
        <Button className="mt-6 w-full">Sign up with email</Button>
      </form>
    </div>
  );
};
