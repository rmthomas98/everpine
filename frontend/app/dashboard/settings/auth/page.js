import { AuthSettings } from "@/components/accountSettings/authentication/auth";
import { auth } from "@/auth";

const AuthPage = async () => {
  const token = await auth();

  return (
    <div className="w-full opacity-0 fade-in-short-delayed">
      <AuthSettings accessToken={token.access_token} />
    </div>
  );
};

export default AuthPage;
