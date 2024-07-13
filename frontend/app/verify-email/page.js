import { redirect } from "next/navigation";
import { ThemedLogo } from "@/components/themedLogo";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HiArrowSmRight } from "react-icons/hi";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const VerifyEmailPage = async ({ searchParams }) => {
  const { token, email } = searchParams;

  if (!token || !email) redirect("/");

  // send request to backend to veryify email
  // if successfull, render success message with link to signin page
  const res = await fetch(`${baseUrl}/user/verify-email`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, email }),
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="p-4">
        <div className="max-w-[400px] mx-auto">
          <div className="flex justify-center">
            <Link href="/" passHref>
              <ThemedLogo />
            </Link>
          </div>
          <Card className="border border-destructive/40 dark:border-destructive/90 mt-4 bg-destructive/5 dark:bg-destructive/10">
            <CardHeader>
              <CardTitle className="text-center">
                Email verification failed
              </CardTitle>
              <CardDescription className="text-center">
                This link is either invalid or expired. Please request a new
                verification email.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  // handle success
  return (
    <div className="p-4">
      <div className="max-w-[400px] mx-auto">
        <div className="flex justify-center">
          <Link href="/" passHref>
            <ThemedLogo />
          </Link>
        </div>
        <Card className="mt-4 border-green-500/40 bg-green-500/5">
          <CardHeader>
            <CardTitle className="text-center">
              Email verified successfully
            </CardTitle>
            <CardDescription className="text-center">
              Your email has been verified. You can now continue to your
              account.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild size="sm" className="w-full">
              <Link href="/signin">
                Continue to dashboard
                <HiArrowSmRight className="ml-2" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
