import { LoginForm } from "@/components/loginForm";
import { getSession } from "@/lib/dal";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getSession();
  if (session) redirect("/dashboard");

  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
