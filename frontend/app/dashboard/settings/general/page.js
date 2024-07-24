import { auth } from "@/auth";
import { GeneralSettings } from "@/components/accountSettings/general/general";

const General = async () => {
  const token = await auth();

  return (
    <div className="fade-in-short-delayed opacity-0 w-full">
      <GeneralSettings accessToken={token.access_token} />
    </div>
  );
};

export default General;
