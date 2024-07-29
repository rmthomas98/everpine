import { redirect } from "next/navigation";
import { getUser } from "@/lib/dal";

const DomainsPage = async () => {
  const user = await getUser();
  if (user.role !== "OWNER") redirect("/dashboard");

  return <div className="fade-in-short-delayed opacity-0">Domains</div>;
};

export default DomainsPage;
