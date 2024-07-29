import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const TeamPage = async () => {
  redirect("/dashboard/team/general");
  return <div></div>;
};

export default TeamPage;
