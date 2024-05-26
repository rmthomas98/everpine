import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const DashboardHome = async () => {
  const user = await getUser();
  if (!user) redirect("/login");

  return <div className="fade-in-short-delayed opacity-0">Dashboard home</div>;
};

export default DashboardHome;
