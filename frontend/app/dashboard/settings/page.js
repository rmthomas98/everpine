import { redirect } from "next/navigation";

const Settings = () => {
  redirect("/dashboard/settings/general");
  return <div></div>;
};

export default Settings;
