"use client";

import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BiLinkAlt } from "react-icons/bi";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetchMembers = async (accessToken, teamId) => {
  const res = await fetch(`${baseUrl}/team/members`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ teamId }),
  });

  if (!res.ok) return [];
  const { members } = await res.json();
  return members;
};

export const Members = ({ accessToken, teamId }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers(accessToken, teamId)
      .then((data) => setMembers(data))
      .catch((e) => console.log(e));
  }, [accessToken]);

  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <p className="text-lg font-semibold">Team members</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm">
              <BiLinkAlt size={15} className="mr-1.5" />
              Invite link
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Invite link</DropdownMenuItem>
            <DropdownMenuItem>Add member</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-sm text-muted-foreground mt-1.5">
        Manage your existings members or create a new one
      </p>
      <div className="mt-6"></div>
    </div>
  );
};
