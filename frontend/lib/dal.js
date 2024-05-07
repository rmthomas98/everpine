import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { ofetch } from "ofetch";
import { cache } from "react";

export const getSession = cache(async () => {
  const cookie = cookies().get("session").value;
  return await decrypt(cookie);
});

export const getUser = cache(async () => {
  const session = await getSession();
  if (!session) return null;

  const { id } = session;
  let user;

  try {
    user = await ofetch(`/auth/me/${id}`, {
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
  } catch (e) {
    console.log(e);
    user = null;
  }

  return user;
});
