import { redirect } from "next/navigation";

const Settings = () => {
  redirect("/dashboard/settings/profile");
  return <div></div>;
};

export default Settings;
