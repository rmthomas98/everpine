import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const allowedRoles = ["OWNER"];

const SubscriptionPage = async () => {
  const user = await getUser();
  if (!allowedRoles.includes(user?.role)) {
    if (user?.role === "ADMIN") {
      redirect("/dashboard/team/members");
    } else {
      redirect("/dashboard");
    }
  }

  return <div></div>;
};

export default SubscriptionPage;
