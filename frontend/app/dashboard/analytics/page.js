import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const Analytics = async () => {
  const user = await getUser();
  if (!user) redirect("/login");

  return <div className="fade-in-short-delayed opacity-0">Analytics</div>;
};

export default Analytics;
