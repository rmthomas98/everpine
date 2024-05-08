import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const SubscribePage = async () => {
  const user = await getUser();
  if (!user) redirect("/login");

  return <div>subscribe</div>;
};

export default SubscribePage;
