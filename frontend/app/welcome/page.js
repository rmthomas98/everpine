import { Welcome } from "@/components/accountSetup/welcome";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const WelcomePage = async () => {
  const user = await getUser();
  if (!user) redirect("/login");

  const { email, isEmailVerified } = user;

  if (isEmailVerified) redirect("/dashboard");

  return <Welcome email={email} />;
};

export default WelcomePage;
