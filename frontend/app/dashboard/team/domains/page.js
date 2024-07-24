import { redirect } from "next/navigation";
import { getUser } from "@/lib/dal";

const allowedRoles = ["OWNER", "ADMIN"];

const DomainsPage = async () => {
  const user = await getUser();
  if (!allowedRoles.includes(user?.role)) redirect("/dashboard");

  return <div className="fade-in-short-delayed opacity-0">Domains</div>;
};

export default DomainsPage;
