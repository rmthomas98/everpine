import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const Links = async () => {
  const user = await getUser();
  if (!user) redirect("/login");

  return <div className="fade-in-short-delayed opacity-0">Links</div>;
};

export default Links;
