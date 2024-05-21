import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { redirectHandler } from "@/lib/redirectHandler";

const DashboardHome = async () => {
  const user = await getUser();
  if (!user) redirect("/login");
  await redirectHandler(user);

  return <div className="fade-in-short-delayed opacity-0">Dashboard home</div>;
};

export default DashboardHome;
