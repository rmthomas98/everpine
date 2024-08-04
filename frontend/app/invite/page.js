import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { InviteWrapper } from "@/components/invite/inviteWrapper";

const InvitePage = async ({ searchParams }) => {
  const { token } = searchParams;
  if (!token) return redirect("/");

  const user = await auth();

  return <InviteWrapper token={token} user={user} />;
};

export default InvitePage;
