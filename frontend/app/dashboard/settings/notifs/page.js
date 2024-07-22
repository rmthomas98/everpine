import { Notifs } from "@/components/accountSettings/notifications/notfis";
import { auth } from "@/auth";

const NotificationPage = async () => {
  const token = await auth();

  return (
    <div className="fade-in-short-delayed opacity-0 w-full">
      <Notifs accessToken={token.access_token} />
    </div>
  );
};

export default NotificationPage;
