import { apiGet } from "@/lib/api";

export const signOut = async () => {
  await apiGet("/auth/signout");
};
