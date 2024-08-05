import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import { Members } from "@/components/team/members";

const MembersPage = async () => {
  const user = await getUser();
  if (user.role !== "OWNER") redirect("/dashboard");

  return (
    <div className="fade-in-short-delayed opacity-0 w-full">
      <Members
        userId={user.id}
        accessToken={user.access_token}
        teamId={user.team.id}
        teamName={user?.team.name}
        plan={user?.team.plan}
      />
    </div>
  );
};

export default MembersPage;
