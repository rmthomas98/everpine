import { redirect } from "next/navigation";

const Settings = () => {
  redirect("/dashboard/settings/profile");

  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};

export default Settings;
