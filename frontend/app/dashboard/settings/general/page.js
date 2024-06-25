import { getUser } from "@/lib/dal";
import { redirect } from "next/navigation";
import {
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";

const Profile = async () => {
  return (
    <div className="fade-in-short-delayed opacity-0">
      <Card>
        <CardHeader>
          <CardTitle>Your name</CardTitle>
          <CardDescription>
            This will be displayed on your profile.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default Profile;
