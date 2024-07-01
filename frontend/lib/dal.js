import "server-only";
import { auth } from "@/auth";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getUser = async () => {
  const token = await auth();
  if (!token) return null;

  const res = await fetch(`${baseUrl}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) return null;

  const data = await res.json();
  data.access_token = token.access_token;
  return data;
};
