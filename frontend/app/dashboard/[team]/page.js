import { getUser } from "@/lib/dal";

const DashboardHome = async () => {
  const user = await getUser();
  return <div className="fade-in-short-delayed opacity-0 text-sm"></div>;
};

export default DashboardHome;
