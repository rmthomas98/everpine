import { getUser } from "@/lib/dal";

const DashboardPage = async () => {
  const user = await getUser();

  return <div></div>;
};

export default DashboardPage;
