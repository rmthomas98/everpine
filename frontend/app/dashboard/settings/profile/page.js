import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";

const Profile = async () => {
  const user = await getUser();
  if (!user) redirect("/login");

  return (
    <div className="fade-in-short-delayed opacity-0">
      <h1>Profile</h1>
    </div>
  );
};

export default Profile;
