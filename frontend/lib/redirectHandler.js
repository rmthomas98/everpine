import "server-only";
import { redirect } from "next/navigation";

export const redirectHandler = (user) => {
  const { isEmailVerified, subscriptionStatus } = user;

  if (!isEmailVerified) redirect("/welcome");

  switch (subscriptionStatus) {
    case "INACTIVE":
      redirect("/subscribe");
      break;
    case "NEW_USER":
      redirect("/subscribe");
      break;
    case "PAST_DUE":
      redirect("/dashboard/settings/subscription");
      break;
    default:
      break;
  }
};
