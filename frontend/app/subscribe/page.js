import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { Subscribe } from "@/components/subscribe/subscribe";

const SubscribePage = async ({ searchParams }) => {
  const session = await auth();
  if (!session) redirect("/signin");

  const { plan, billing } = searchParams;
  if (!plan) redirect("/dashboard");
  if (plan === "free") redirect("/dashboard");
  if (plan !== "professional" && plan !== "business" && plan !== "enterprise")
    redirect("/dashboard");

  const billingOptions = ["month", "annual"];
  let billingOption = billing;
  if (!billingOptions.includes(billing)) {
    billingOption = "annual";
  }

  return (
    <div className="opacity-0 fade-in-short-delayed">
      <Subscribe
        accessToken={session.access_token}
        plan={plan}
        billing={billingOption}
      />
    </div>
  );
};

export default SubscribePage;
