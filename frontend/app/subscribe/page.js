import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dreamist | Subscribe",
};

const SubscribePage = async () => {
  const user = await getUser();
  if (!user) redirect("/login");

  const { isEmailVerified, subscriptionStatus } = user;
  if (!isEmailVerified) redirect("/welcome");

  if (subscriptionStatus === "TRIAL" || subscriptionStatus === "ACTIVE") {
    redirect("/dashboard");
  }

  if (subscriptionStatus === "PAST_DUE") {
    redirect("/dashboard/settings/subscription");
  }

  let clientSecret;

  if (subscriptionStatus === "INACTIVE") {
  }

  return <div>subscribe</div>;
};

export default SubscribePage;
