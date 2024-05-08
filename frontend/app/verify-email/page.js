import { redirect } from "next/navigation";
import { ofetch } from "ofetch";
import { VerifyEmail } from "@/components/accountSetup/verifyEmail";

const VerifyEmailPage = async ({ searchParams }) => {
  const { token } = searchParams;
  if (!token) redirect("/");

  // get user by email token and check if email is verified
  try {
    const user = await ofetch(`/account-setup/${token}`, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      cache: "no-store",
    });
    const { isEmailVerified } = user;
    if (isEmailVerified) redirect("/dashboard");
  } catch (e) {
    console.log(e);
    redirect("/");
  }

  return (
    <div className="p-4">
      <div className="fade-in-short-delayed opacity-0 max-w-[400px] mx-auto">
        <VerifyEmail token={token} />
      </div>
    </div>
  );
};

export default VerifyEmailPage;
