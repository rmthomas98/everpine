"use client";

import { useEffect } from "react";
import { useState } from "react";
import { AddMember } from "@/components/team/addMember";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { limits } from "@/data/limits";
import { Skeleton } from "@/components/ui/skeleton";
import { MembersTable } from "@/components/team/membersTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterMembers } from "@/components/team/filter";
import { InvitesTable } from "@/components/team/invitesTable";

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

export const Members = ({ accessToken, teamId, plan, userId }) => {
  const [members, setMembers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [activeTab, setActiveTab] = useState("members");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const { seats } = limits[plan.toLowerCase()];

  useEffect(() => {
    fetchMembers(accessToken, teamId)
      .then((data) => {
        setMembers(data.members);
        setInvites(data.invites);
      })
      .catch((e) => console.log(e));
  }, [accessToken]);

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
          seats={seats}
        />
      </div>
      <div className="mt-6 flex items-center justify-between space-x-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger className="w-[120px] text-[13px]" value="members">
              Members
            </TabsTrigger>
            <TabsTrigger className="w-[120px] text-[13px]" value="invites">
              Invitations
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="max-w-[220px] w-full flex flex-col space-y-1.5">
          <div className="w-full flex justify-between items-center">
            <p className="text-[13px]">Seats</p>
            {members?.length ? (
              <p className="text-muted-foreground text-[12px] fade-in-short-delayed opacity-0">
                {members?.length}/{seats}
              </p>
            ) : (
              <Skeleton className="h-[18px] w-6 rounded-md" />
            )}
          </div>
          <Progress value={(members?.length / seats) * 100} className="h-1.5" />
        </div>
      </div>
      <FilterMembers
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
      />
      {activeTab === "members" ? (
        <MembersTable
          members={members}
          setMembers={setMembers}
          accessToken={accessToken}
          userId={userId}
          role={role}
        />
      ) : (
        <InvitesTable
          accessToken={accessToken}
          invites={invites}
          setInvites={setInvites}
          role={role}
        />
      )}
    </div>
  );
};
