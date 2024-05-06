import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";
import { ofetch } from "ofetch";

export const getSession = async () => {
  const cookie = cookies().get("session").value;
  const session = await decrypt(cookie);
  if (!session.id) redirect("/login");
  return session;
};

export const getUser = async () => {
  const session = await getSession();

  let user;

  try {
    user = await ofetch(`/user/${id}`, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  } catch (e) {
    console.log(e);
    user = null;
  }

  if (!user) redirect("/login");

  return user;
};
