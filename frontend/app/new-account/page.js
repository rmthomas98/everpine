import { NewAccount } from "@/components/signup/newAccount";
import { getSession } from "@/lib/dal";

const NewAccountPage = async () => {
  const session = await getSession();

  return <NewAccount email={session.email} />;
};

export default NewAccountPage;
