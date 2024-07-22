import { auth } from "@/auth";
import { Teams } from "@/components/accountSettings/teams/teams";

const TeamsPage = async () => {
  const token = await auth();

  return <Teams accessToken={token.access_token} />;
};

export default TeamsPage;
