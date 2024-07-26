"use client";

import { useEffect } from "react";
import { useState } from "react";
import { AddMember } from "@/components/team/addMember";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const { members, invites } = await res.json();
  return { members, invites };
};

export const Members = ({ accessToken, teamId, plan }) => {
  const [members, setMembers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [activeTab, setActiveTab] = useState("members");

  useEffect(() => {
    fetchMembers(accessToken, teamId)
      .then((data) => {
        setMembers(data.members);
        setInvites(data.invites);
      })
      .catch((e) => console.log(e));
  }, [accessToken]);

  console.log(members, invites);

  return (
    <div>
      <div className="flex justify-between items-center w-full">
        <p className="text-lg font-semibold">Team members</p>
      </div>
      <p className="text-sm text-muted-foreground mt-1.5">
        Manage your team members or invite new ones
      </p>
      <div className="mt-6">
        <AddMember
          accessToken={accessToken}
          members={members}
          setMembers={setMembers}
          plan={plan}
        />
      </div>
      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger className="w-[100px] text-[13px]" value="members">
              Members
            </TabsTrigger>
            <TabsTrigger className="w-[100px] text-[13px]" value="invites">
              Invitations
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};
