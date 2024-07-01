import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { GeneralSettings } from "@/components/accountSettings/general/general";

const General = async () => {
  const token = await auth();
  if (!token) redirect("/signin");

  return (
    <div className="fade-in-short-delayed opacity-0 w-full flex flex-col space-y-6">
      <GeneralSettings accessToken={token.access_token} />
    </div>
  );
};

export default General;
