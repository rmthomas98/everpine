"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { FiMoreHorizontal } from "react-icons/fi";
import { TableSkeleton } from "@/components/team/tableSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { filterMembers } from "@/lib/filterMembers";
import { BiLinkAlt, BiUser, BiXCircle } from "react-icons/bi";
import { RemoveMember } from "@/components/team/dialogs/removeMember";
import { BulkRemoveMembers } from "@/components/team/dialogs/bulkRemoveMembers";
import { ChangeRole } from "@/components/team/dialogs/changeRole";
import { LeaveTeam } from "@/components/team/dialogs/leaveTeam";

export const MembersTable = ({
  members,
  setMembers,
  accessToken,
  userId,
  teamId,
  role,
  search,
  teamName,
}) => {
  const [selected, setSelected] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState(members);
  const currUser = members.find((member) => member.user.id === userId);

  const [selectedMember, setSelectedMember] = useState(null); // used for removing a single member or updating their role
  const [isRemoveMemberOpen, setIsRemoveMemberOpen] = useState(false);
  const [isRemoveBulkOpen, setIsRemoveBulkOpen] = useState(false);
  const [isUpdateRoleOpen, setIsUpdateRoleOpen] = useState(false);
  const [isLeaveTeamOpen, setIsLeaveTeamOpen] = useState(false);

  const onSelect = (id) => {
    if (selected.includes(id)) {
      // remove the id from selected array
      const filtered = selected.filter((memberId) => memberId !== id);
      return setSelected(filtered);
    }

    setSelected([...selected, id]);
  };

  const onSelectAll = () => {
    // if the current user is included in the filtered members, we need to subtract 1 from the total
    const numToSubtract =
      filteredMembers.includes(currUser) && filteredMembers.length > 1 ? 1 : 0;
    if (selected.length === filteredMembers.length - numToSubtract) {
      return setSelected([]);
    }
    // select all members besides the current user
    const all = filteredMembers.map((member) => member.user.id);
    const filtered = all.filter((id) => id !== userId);
    setSelected(filtered);
  };

  useEffect(() => {
    // if the current user is included in the filtered members, we need to subtract 1 from the total
    const numToSubtract =
      filteredMembers.includes(currUser) && filteredMembers.length > 1 ? 1 : 0;
    if (selected.length === filteredMembers.length - numToSubtract) {
      setIsAllSelected(true);
    } else if (selected.length === 0) {
      setIsAllSelected(false);
    } else {
      setIsAllSelected("indeterminate");
    }
  }, [selected, filteredMembers]);

  // filter members based on search and role
  useEffect(() => {
    const newMembers = filterMembers(search, role, members);
    setFilteredMembers(newMembers);
    // make sure to reset selected if search does not include user anymore
    if (selected.length) {
      const filtered = newMembers.filter((member) =>
        selected.includes(member.user.id),
      );
      setSelected(filtered.map((member) => member.user.id));
    }
  }, [search, role, members]);

  if (!members.length) return <TableSkeleton />;
  if (!filteredMembers.length) return <NoResults />;

  return (
    <>
      <div className="mt-3 opacity-0 fade-in-short-delayed">
        <div className="shadow rounded-lg border w-full">
          <div className="w-full flex justify-between items-center px-4 py-3 border-b space-x-4 h-[57px]">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="check-all"
                onCheckedChange={onSelectAll}
                checked={isAllSelected}
                disabled={
                  members.length === 1 ||
                  (filteredMembers.length === 1 &&
                    filteredMembers[0].user.id === userId)
                }
              />
              <label htmlFor="check-all" className="text-[13px]">
                {!selected.length
                  ? `Select all (${filteredMembers?.length})`
                  : `${selected.length} of ${filteredMembers?.length} selected`}
              </label>
            </div>
            {selected.length ? (
              <Button
                className="fade-in opacity-0"
                size="sm"
                variant="destructive"
                onClick={() => setIsRemoveBulkOpen(true)}
              >
                {selected.length > 1 ? "Remove members" : "Remove member"}
              </Button>
            ) : undefined}
          </div>
          {filteredMembers.map((member, i) => (
            <div
              key={member.user.id}
              className={`w-full flex justify-between items-center p-4 space-x-4 ${
                i === filteredMembers.length - 1 ? undefined : "border-b"
              }`}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selected.includes(member.user.id)}
                  onCheckedChange={() => onSelect(member.user.id)}
                  disabled={member.user.id === userId}
                />
                <Avatar className="h-8 w-8">
                  <AvatarImage src={member.user.avatar} alt="avatar" />
                  <AvatarFallback>
                    <p className="text-xs">
                      {member.user.email[0].toUpperCase()}
                    </p>
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p className="text-[13px]">{member.user.email}</p>

                  <p className="text-[13px] text-muted-foreground">
                    {member.role.split("")[0] +
                      member.role.slice(1).toLowerCase()}
                  </p>
                </div>
              </div>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    disabled={members.length === 1}
                  >
                    <FiMoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="space-x-1.5"
                    onSelect={() => {
                      setSelectedMember(member);
                      setIsUpdateRoleOpen(true);
                    }}
                  >
                    <BiUser />
                    <span>Change role</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={
                      member.user.id === userId
                        ? () => setIsLeaveTeamOpen(true)
                        : () => {
                            setSelectedMember(member);
                            setIsRemoveMemberOpen(true);
                          }
                    }
                    className="space-x-1.5 text-red-600 hover:!text-red-600 hover:!bg-destructive/10"
                  >
                    <BiXCircle />
                    <span>
                      {member.user.id === userId
                        ? "Leave team"
                        : "Remove member"}
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
      <RemoveMember
        accessToken={accessToken}
        member={selectedMember}
        teamId={teamId}
        setMembers={setMembers}
        setIsOpen={setIsRemoveMemberOpen}
        isOpen={isRemoveMemberOpen}
      />
      <BulkRemoveMembers
        members={
          selected.length
            ? selected.map((id) => {
                const member = members.find((member) => member.user.id === id);
                return member?.id; // role id
              })
            : undefined
        }
        accessToken={accessToken}
        teamId={teamId}
        setMembers={setMembers}
        setIsOpen={setIsRemoveBulkOpen}
        isOpen={isRemoveBulkOpen}
      />
      <ChangeRole
        accessToken={accessToken}
        isOpen={isUpdateRoleOpen}
        setIsOpen={setIsUpdateRoleOpen}
        teamId={teamId}
        member={selectedMember}
        setMembers={setMembers}
        userId={userId}
      />
      <LeaveTeam
        accessToken={accessToken}
        teamId={teamId}
        isOpen={isLeaveTeamOpen}
        setIsOpen={setIsLeaveTeamOpen}
        teamName={teamName}
      />
    </>
  );
};

const NoResults = () => {
  return (
    <div className="mt-3 opacity-0 fade-in-short-delayed p-4 rounded-lg border shadow h-[200px] bg-accent/50 dark:bg-accent/30 w-full space-y-1 flex flex-col justify-center items-center">
      <p className="text-sm text-center">No results found</p>
      <p className="text-[13px] text-muted-foreground text-center">
        Try adjusting your search query
      </p>
    </div>
  );
};
