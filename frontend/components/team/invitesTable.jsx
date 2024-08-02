"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { FiMoreHorizontal } from "react-icons/fi";
import { Invites } from "@/components/team/invites";
import { filterSearch } from "@/lib/filterInvites";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiLinkAlt, BiUser, BiXCircle } from "react-icons/bi";

export const InvitesTable = ({
  invites,
  setInvites,
  accessToken,
  role,
  search,
}) => {
  const [selected, setSelected] = useState([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [filteredInvites, setFilteredInvites] = useState(invites);

  const onSelectAll = () => {
    if (selected.length === filteredInvites.length) {
      return setSelected([]);
    }
    setSelected(filteredInvites.map((invite) => invite.id));
  };

  // used to determine if all invites are selected
  // runs when selected or filteredInvites change
  useEffect(() => {
    if (selected.length === filteredInvites.length && filteredInvites.length) {
      setIsAllSelected(true);
    } else if (selected.length === 0) {
      setIsAllSelected(false);
    } else {
      setIsAllSelected("indeterminate");
    }
  }, [filteredInvites, selected]);

  // filter invites based on search and role
  useEffect(() => {
    const newInvites = filterSearch(search, role, invites);
    setFilteredInvites(newInvites);
    // make sure to reset selected if search does not include user anymore
    if (selected.length) {
      const filtered = newInvites.filter((invite) =>
        selected.includes(invite.id),
      );
      setSelected(filtered.map((invite) => invite.id));
    }
  }, [search, role, invites]);

  // if there are no invites or no search results, show a message
  if (!invites.length) return <NoInvites />;
  if (!filteredInvites.length) return <NoResults />;

  return (
    <div className="mt-3 opacity-0 fade-in-short-delayed shadow rounded-lg border">
      <div className="w-full flex justify-between items-center px-4 py-3 border-b space-x-4 h-[57px]">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="check-all"
            onCheckedChange={onSelectAll}
            checked={isAllSelected}
          />
          <label htmlFor="check-all" className="text-[13px]">
            {!selected.length
              ? `Select all (${filteredInvites?.length})`
              : `${selected.length} of ${filteredInvites?.length} selected`}
          </label>
        </div>
        {selected.length ? (
          <Button className="fade-in opacity-0" size="sm" variant="destructive">
            {selected.length > 1 ? "Revoke invites" : "Revoke invite"}
          </Button>
        ) : undefined}
      </div>
      <Invites
        invites={filteredInvites}
        setInvites={setInvites}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};

const NoInvites = () => {
  return (
    <div className="mt-3 opacity-0 fade-in-short-delayed p-4 rounded-lg border shadow h-[200px] bg-accent/50 dark:bg-accent/30 w-full space-y-1 flex flex-col justify-center items-center">
      <p className="text-sm text-center">No pending invitations</p>
      <p className="text-[13px] text-muted-foreground text-center">
        You can invite members by using the form above
      </p>
    </div>
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
