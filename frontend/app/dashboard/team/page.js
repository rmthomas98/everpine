import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const Team = async () => {
  redirect("/dashboard/team/members");
  return <div></div>;
};

export default Team;
