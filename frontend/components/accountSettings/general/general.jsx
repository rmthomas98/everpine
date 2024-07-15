"use client";

import { useEffect, useState } from "react";
import { NameCard } from "@/components/accountSettings/general/name";
import { DeleteAccountCard } from "@/components/accountSettings/general/delete";
import { EmailCard } from "@/components/accountSettings/general/email";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const getUserInfo = async (accessToken) => {
  const res = await fetch(`${baseUrl}/user/info/general`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) return null;
  return await res.json();
};

export const GeneralSettings = ({ accessToken }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserInfo(accessToken).then((data) => setUser(data));
    return () => setUser(null);
  }, []);

  return (
    <div className="w-full flex flex-col space-y-6">
      <NameCard user={user} accessToken={accessToken} />
      <EmailCard user={user} accessToken={accessToken} />
      <DeleteAccountCard user={user} accessToken={accessToken} />
    </div>
  );
};
