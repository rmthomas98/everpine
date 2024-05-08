import { redirect } from "next/navigation";
import { ofetch } from "ofetch";

const VerifyAccountPage = async ({ searchParams }) => {
  const { token } = searchParams;
  if (!token) redirect("/login");

  let user;
  // get user by email token and check if email is verified
  try {
    user = await ofetch(`/account-setup/${token}`, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  } catch (e) {
    redirect("/");
  }

  const { email, isEmailVerified } = user;

  return <div>{email}</div>;
};

export default VerifyAccountPage;
