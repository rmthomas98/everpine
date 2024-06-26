"use client";

import { useState, useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { HiMiniCheck, HiMiniChevronUpDown } from "react-icons/hi2";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CreateTeamDialog } from "@/components/subscribe/teamSelector/createTeamDialog";
import { FiPlusCircle } from "react-icons/fi";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const fetchTeams = async (accessToken) => {
  try {
    const res = await fetch(`${baseUrl}/team/roles`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const { roles: data, defaultTeamId } = await res.json();
    let filteredData = data.map((item) => {
      if (item.role === "OWNER") {
        if (item.team.plan === "FREE") {
          return {
            role: item.role,
            id: item.teamId,
            name: item.team.name,
            avatar: item.team.avatar,
            create: false,
            slug: item.team.slug,
          };
        }
      }
    });
    filteredData = filteredData.filter((item) => item !== undefined);
    return { data: filteredData, defaultTeamId };
  } catch {
    return [];
  }
};

export const TeamSelector = ({ accessToken, setSelectedTeam }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const popoverTriggerRef = useRef();

  const getTeams = async () => {
    const data = await fetchTeams(accessToken);
    setTeams(data?.data);
    setSelectedTeam(data?.data.find((team) => team.id === data?.defaultTeamId));
    setValue(data?.data.find((team) => team.id === data?.defaultTeamId));
    setIsLoading(false);
  };

  useEffect(() => {
    getTeams();

    // clean up
    return () => {
      setIsLoading(true);
      setTeams([]);
      setSelectedTeam(null);
      setValue(null);
    };
  }, []);

  if (isLoading) return <Skeleton className="h-[36px] w-full" />;

  return (
    <div className="fade-in-short-delayed opacity-0">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between min-h-[36px]"
            size="sm"
            ref={popoverTriggerRef}
          >
            {value ? (
              <div className="flex items-center space-x-2">
                <Avatar className="h-[20px] w-[20px]">
                  <AvatarImage src={value.avatar} alt={value.name} />
                </Avatar>
                <span>{value.name}</span>
              </div>
            ) : (
              <p>Assign plan to...</p>
            )}
            <HiMiniChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{ width: popoverTriggerRef.current?.offsetWidth }}
        >
          <Command
            filter={(value, search) => {
              const teamName = teams.find((team) => team.id === value)?.name;
              const searchNormalized = search.toLowerCase().trim();
              if (!teamName?.toLowerCase().includes(searchNormalized)) {
                return false;
              }
              return true;
            }}
          >
            <CommandInput
              placeholder="Search teams..."
              className="text-[13px] h-8"
            />
            <CommandEmpty>
              <p className="text-[13px] text-muted-foreground">
                No teams found
              </p>
            </CommandEmpty>
            <CommandList>
              <CommandGroup heading="My teams">
                {teams?.map((team) => (
                  <CommandItem
                    key={team.id}
                    value={team.id}
                    className={`text-[13px] flex w-full justify-between`}
                    onSelect={(currValue) => {
                      const team = teams.find((team) => team.id === currValue);
                      setValue(team);
                      setSelectedTeam(team);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-[20px] w-[20px]">
                        <AvatarImage src={team.avatar} alt={team.name} />
                      </Avatar>
                      <span className="text-[13px] font-medium max-w-[234px] truncate">
                        {team.name}
                      </span>
                    </div>
                    <HiMiniCheck
                      size={13}
                      className={`mr-2 ${
                        team.id === value?.id ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </CommandItem>
                ))}
                <CommandItem
                  className="text-[13px] space-x-2 flex font-medium"
                  onSelect={() => {
                    setIsDialogOpen(true);
                    setOpen(false);
                  }}
                >
                  {/*<HiMiniPlusCircle size={15} className="ml-[3px]" />*/}
                  <FiPlusCircle size={15} className="ml-0.5" />
                  <span>Create new team</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <CreateTeamDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        setTeams={setTeams}
        setSelectedTeam={setSelectedTeam}
        setValue={setValue}
      />
    </div>
  );
};
