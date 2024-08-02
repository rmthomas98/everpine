"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiSearch } from "react-icons/fi";

export const FilterMembers = ({ search, setSearch, role, setRole }) => {
  return (
    <div className="flex space-x-2 mt-3">
      <div className="relative w-full">
        <FiSearch
          size={15}
          className="absolute text-muted-foreground left-3 top-1/2 transform -translate-y-1/2"
        />
        <Input
          className="w-full pl-[34px]"
          placeholder="Search email..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </div>
      <div className="max-w-[220px] w-full">
        <Select defaultValue="all" onValueChange={(value) => setRole(value)}>
          <SelectTrigger>
            {role === "all"
              ? "All roles"
              : role.split("")[0].toUpperCase() + role.slice(1)}
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All roles</SelectItem>
            <SelectItem value="owner">Owner</SelectItem>
            <SelectItem value="member">Member</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
