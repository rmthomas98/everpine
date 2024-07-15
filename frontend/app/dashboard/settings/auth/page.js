import { PasswordCard } from "@/components/accountSettings/authentication/password";
import { TwoFactorAuthCard } from "@/components/accountSettings/authentication/twoFactorAuth";
import { auth } from "@/auth";

const AuthPage = async () => {
  const token = await auth();

  return (
    <div className="w-full flex flex-col space-y-6 opacity-0 fade-in-short-delayed">
      <PasswordCard accessToken={token.access_token} />
      <TwoFactorAuthCard />
    </div>
  );
};

export default AuthPage;
