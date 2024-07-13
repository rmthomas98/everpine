"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BiLogoGoogle } from "react-icons/bi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const planMap = {
  professional: "Professional",
  business: "Business",
  enterprise: "Enterprise",
};

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const SignUpForm = ({ plan, billing }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const [isLoadingEmail, setIsLoadingEmail] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const onSubmit = async (values) => {
    const { email, password } = values;
    setIsLoadingEmail(true);

    const res = await fetch(`${baseUrl}/user/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, provider: "credentials" }),
    });

    if (res.ok) {
      // sign user in, redirect to next page based on plan
      const options = { email, password, redirect: false };
      const res = await signIn("credentials", options);

      // check if error signing in
      if (res.error) return toast.error("Error signing in");

      // redirect to subsription page if selected plan
      if (!plan) return router.push("/dashboard");
      router.push(`/subscribe?plan=${plan}&billing=${billing}`);
      return;
    }

    // handle the signup error here
    const data = await res.json();
    setIsLoadingEmail(false);
    toast.error(data);
  };

  return (
    <div className="max-w-[400px] w-full mx-auto">
      <p className="font-semibold text-lg text-center">Create your account</p>
      <p className="text-muted-foreground mt-1 text-sm text-center">
        {`Enter your details to get started ${
          planMap[plan] ? `with ${planMap[plan]}` : "for free"
        }`}
      </p>
      <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="Work email"
          className={`w-full ${
            errors.email &&
            "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive dark:focus-visible:border-destructive dark:focus-visible:ring-destructive/50"
          }`}
          type="email"
          {...register("email", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
        />
        {errors.email && (
          <p className="text-destructive text-xs mt-1.5 dark:text-red-600">
            Please enter a valid email address
          </p>
        )}
        <Input
          placeholder="Password"
          className={`w-full mt-4 ${
            errors.password &&
            "border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive dark:focus-visible:border-destructive dark:focus-visible:ring-destructive/50"
          }`}
          type="password"
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password?.type === "required" && (
          <p className="text-destructive text-xs mt-1.5 dark:text-red-600">
            Please enter a password
          </p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-destructive text-xs mt-1.5 dark:text-red-600">
            Password must be at least 8 characters
          </p>
        )}
        <Button
          className="mt-6 w-full"
          disabled={isLoadingEmail || isLoadingGoogle}
        >
          {isLoadingEmail ? (
            <CgSpinner className="animate-spin" />
          ) : (
            "Sign up with email"
          )}
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
          disabled={isLoadingGoogle || isLoadingEmail}
          onClick={async () => {
            setIsLoadingGoogle(true);
            const res = await signIn("google", {
              callbackUrl: `http://localhost:3000/subscribe?plan=${plan}&billing=${billing}`,
              redirect: false,
            });
          }}
        >
          {isLoadingGoogle ? (
            <CgSpinner className="animate-spin" />
          ) : (
            <>
              <BiLogoGoogle size={20} className="mr-2" />
              Sign up with Google
            </>
          )}
        </Button>
      </div>
      <div className="mt-6 max-w-[340px] mx-auto">
        <p className="text-xs text-muted-foreground text-center leading-5">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms of service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy policy
          </Link>
        </p>
      </div>
    </div>
  );
};
