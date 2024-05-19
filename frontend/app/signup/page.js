import { SignupForm } from "@/components/accountSetup/signupForm";
import { getSession } from "@/lib/dal";
import { redirect } from "next/navigation";

const SignupPage = async () => {
  const session = await getSession();
  if (session) redirect("/dashboard");
  return <SignupForm />;
};

export default SignupPage;
