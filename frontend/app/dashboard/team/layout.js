import { Separator } from "@/components/ui/separator";
import { TeamNav } from "@/components/team/teamNav";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const TeamLayout = async ({ children }) => {
  const user = await getUser();

  return (
    <div>
      <div className="px-4 py-6 opacity-0 fade-in-short-delayed">
        <div className="flex items-center space-x-2">
          {/*<BiCog className="text-xl" />*/}
          <h1 className="text-xl font-bold pl-2">My Team</h1>
        </div>
      </div>
      <div className="pr-4 opacity-0 fade-in-short-delayed">
        <Separator />
      </div>
      <div className="flex space-x-8 py-6 px-4">
        <TeamNav role={user?.role} />
        {children}
      </div>
    </div>
  );
};

export default TeamLayout;
