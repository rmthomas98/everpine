import { SideNav } from "@/components/dashboardLayout/sideNav";
import { AppNav } from "@/components/dashboardLayout/appNav";
import { getUser } from "@/lib/dal";

const DashboardLayout = async ({ children }) => {
  const user = await getUser();

  return (
    <div className="max-w-[1374px] mx-auto">
      <div className="flex w-full">
        <SideNav user={user} />
        <div className="w-full">
          <AppNav email={user.email} />
          <div className="py-4 px-4">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
