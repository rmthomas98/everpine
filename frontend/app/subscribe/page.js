import { auth } from "@/auth";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const SubscribePage = async ({ searchParams }) => {
  const session = await auth();
  console.log(session);
  if (!session) redirect("/signin");

  // const teams = await fetch(`${baseUrl}/teams`, {});

  return <div>{JSON.stringify(session)}</div>;
};

export default SubscribePage;
