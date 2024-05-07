import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
const DashboardLayout = async ({ children }) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
