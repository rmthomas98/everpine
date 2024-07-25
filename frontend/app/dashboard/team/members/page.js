import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { Members } from "@/components/team/members";

const allowedRoles = ["OWNER", "ADMIN"];

const MembersPage = async () => {
  const user = await getUser();
  if (!allowedRoles.includes(user?.role)) redirect("/dashboard");

  return (
    <div className="fade-in-short-delayed opacity-0 w-full">
      <Members
        accessToken={user.access_token}
        teamId={user.team.id}
        plan={user?.team.plan}
      />
    </div>
  );
};

export default MembersPage;
