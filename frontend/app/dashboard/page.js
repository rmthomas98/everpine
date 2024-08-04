import { getUser } from "@/lib/dal";

const DashboardPage = async () => {
  const user = await getUser();
  return <div>home</div>;
};

export default DashboardPage;
