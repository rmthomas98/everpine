"use client";

import { HiMiniChevronUpDown, HiMiniCheck } from "react-icons/hi2";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FiPlusCircle } from "react-icons/fi";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const TeamPicker = ({ teams, defaultTeam, accessToken }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultTeam);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setValue(defaultTeam);
  }, [defaultTeam]);

  const onTeamSelect = async (team) => {
    setValue(teams.find((t) => t.id === team));
    setOpen(false);
    // make call to backend to set the selected team and reload the page
    const res = await fetch(`${baseUrl}/team/default`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ teamId: team }),
    });

    if (res.ok) {
      window?.location.reload();
      return;
    }

    toast({
      title: "Error selecting team",
      description: "Please try again",
      variant: "destructive",
    });
    setOpen(false);
  };

  if (!teams?.length) return <Skeleton className="h-[36px] w-full" />;

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
          >
            {value ? (
              <div className="flex items-center space-x-2">
                <Avatar className="h-[20px] w-[20px]">
                  <AvatarImage src={value.avatar} alt={value.name} />
                </Avatar>
                <span>{value.name}</span>
              </div>
            ) : (
              <p>Select team...</p>
            )}
            <HiMiniChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[210px]">
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
                    key={team.name}
                    value={team.id}
                    className={`text-[13px] flex w-full justify-between`}
                    onSelect={(currValue) => onTeamSelect(currValue)}
                  >
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-[20px] w-[20px]">
                        <AvatarImage src={team.avatar} alt={team.name} />
                      </Avatar>
                      <span className="text-[13px] font-medium">
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
                    // sned to select plan page
                    // then send to payment page where they will create their team
                    // and make payment
                  }}
                >
                  <FiPlusCircle size={15} className="ml-0.5" />
                  <span>Create new team</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
