import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Subscribe } from "@/components/subscribe/subscribe";

const SubscribePage = async ({ searchParams }) => {
  const token = await auth();
  if (!token) redirect("/signin");

  let { plan, billing } = searchParams;

  plan = plan?.toLowerCase();
  if (!plan) redirect("/dashboard");
  if (plan === "free") redirect("/dashboard");
  if (plan !== "professional" && plan !== "business" && plan !== "enterprise") {
    redirect("/dashboard");
  }

  const billingOptions = ["month", "annual"];
  let billingOption = billing?.toLowerCase();
  if (!billingOptions.includes(billing)) {
    billingOption = "annual";
  }

  return (
    <div className="opacity-0 fade-in-short-delayed">
      <Subscribe
        accessToken={token.access_token}
        plan={plan}
        billing={billingOption}
      />
    </div>
  );
};

export default SubscribePage;
