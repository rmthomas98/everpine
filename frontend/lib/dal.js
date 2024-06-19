import "server-only";
import { auth } from "@/auth";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getUser = async () => {
  const token = await auth();
  if (!token) return null;

  try {
    const res = await fetch(`${baseUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (res.ok) {
      const data = await res.json();
      data.access_token = token.access_token;
      return data;
    }
    // destroy token if user is not found
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
