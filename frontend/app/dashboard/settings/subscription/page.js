import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <div className="fade-in-short-delayed opacity-0">
      <h1>Subscription</h1>
      <p>Subscription settings</p>
    </div>
  );
};

export default Page;
