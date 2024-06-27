import { SideNav } from "@/components/dashboardLayout/sideNav";
import { AppNav } from "@/components/dashboardLayout/appNav";
import NextTopLoader from "nextjs-toploader";
import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const DashboardLayout = async ({ children }) => {
  const user = await getUser();
  if (!user) redirect("/signin");

  return (
    <>
      <NextTopLoader showSpinner={false} color="#6366f1" height={2} />
      <AppNav user={user} />
      <div className="max-w-[1400px] mx-auto">
        <div className="w-full flex">
          <SideNav user={user} />
          <div className="w-full">
            <div>
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
