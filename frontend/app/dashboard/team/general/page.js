import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const GeneralPage = async () => {
  const user = await getUser();
  if (user.role !== "OWNER") redirect("/dashboard");
  return (
    <div className="fade-in-short-delayed opacity-0">general team settings</div>
  );
};

export default GeneralPage;
