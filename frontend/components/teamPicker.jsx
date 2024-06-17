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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FiPlusCircle } from "react-icons/fi";

const frameworks = [
  {
    avatar: "https://github.com/shadcn.png",
    value: "next.js",
    label: "Next.js",
  },
  {
    avatar: "https://github.com/shadcn.png",
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    avatar: "https://github.com/shadcn.png",
    value: "nuxt.js",
    label: "Nuxt.js",
  },
];

export const TeamPicker = ({ label }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
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
                <AvatarImage
                  src={
                    frameworks?.find((framework) => framework.value === value)
                      ?.avatar
                  }
                  alt={
                    frameworks?.find((framework) => framework.value === value)
                      ?.label
                  }
                />
              </Avatar>
              <span>
                {
                  frameworks?.find((framework) => framework.value === value)
                    ?.label
                }
              </span>
            </div>
          ) : (
            <p>{label ? label : "Select team..."}</p>
          )}
          <HiMiniChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[210px] p-0">
        <Command>
          <CommandInput
            placeholder="Search teams..."
            className="text-[13px] h-8"
          />
          <CommandEmpty>No teams found</CommandEmpty>
          <CommandList>
            <CommandGroup heading="My teams">
              {frameworks?.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  className={`text-[13px] flex w-full justify-between`}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-[20px] w-[20px]">
                      <AvatarImage
                        src={framework.avatar}
                        alt={framework.label}
                      />
                    </Avatar>
                    <span className="text-[13px]">{framework.label}</span>
                  </div>
                  <HiMiniCheck
                    size={13}
                    className={`mr-2 h-4 w-4 ${
                      value === framework.value ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ))}
              <CommandItem className="text-[13px] space-x-2 flex">
                <FiPlusCircle size={15} className="ml-0.5" />
                <span className="text-muted-foreground">Create new team</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
