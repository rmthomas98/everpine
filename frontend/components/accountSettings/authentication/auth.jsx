"use client";

import { PasswordCard } from "@/components/accountSettings/authentication/password";
import { Security } from "@/components/accountSettings/authentication/security";
import { useState, useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const getUserInfo = async (accessToken) => {
  const res = await fetch(`${baseUrl}/user/info`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return null;
  return await res.json();
};

export const AuthSettings = ({ accessToken }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserInfo(accessToken).then((data) => setUser(data));
    return () => setUser(null);
  }, []);

  return (
    <div className="flex flex-col space-y-6 w-full">
      <PasswordCard accessToken={accessToken} user={user} />
      <Security accessToken={accessToken} user={user} />
    </div>
  );
};
