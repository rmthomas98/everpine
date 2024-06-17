import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/token";
import { ofetch } from "ofetch";

export const getSession = async () => {
  const cookie = cookies().get("session")?.value;
  return await decrypt(cookie);
};

export const getUser = async () => {
  const session = await getSession();
  if (!session || !session.id) return null;

  try {
    return await ofetch(`/auth/me/${session.id}`, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      cache: "no-store",
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};
