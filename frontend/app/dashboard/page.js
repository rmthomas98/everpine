import { getUser } from "@/lib/dal";

const DashboardPage = async () => {
  const user = await getUser();
  console.log(user);
  return <div></div>;
};

export default DashboardPage;
