import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  const user = await getUser();
  if (user.role !== "OWNER") redirect("/dashboard");

  return <div></div>;
};

export default SubscriptionPage;
