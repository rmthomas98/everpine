import { SideNav } from "@/components/dashboardLayout/sideNav";
import { AppNav } from "@/components/dashboardLayout/appNav";
import NextTopLoader from "nextjs-toploader";

const DashboardLayout = async ({ children }) => {
  // const user = await getUser();
  // const { role, email, subscriptionStatus: status } = user;

  const role = "admin";
  const email = " [email protected]";
  const status = "active";

  return (
    <>
      <NextTopLoader showSpinner={false} color="#6366f1" height={2} />
      <div className="max-w-[1374px] mx-auto">
        <div className="flex w-full">
          <SideNav role={role} />
          <div className="w-full">
            <AppNav email={email} role={role} subscriptionStatus={status} />
            <div className="py-4 px-4">
              <div className="w-full">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
