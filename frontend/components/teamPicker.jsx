"use client";

import { HiMiniChevronUpDown, HiMiniCheck } from "react-icons/hi2";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export const TeamPicker = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? frameworks?.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <HiMiniChevronUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[210px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {/*{frameworks.map((framework) => (*/}
            {/*  <CommandItem*/}
            {/*    key={framework.value}*/}
            {/*    value={framework.value}*/}
            {/*    onSelect={(currentValue) => {*/}
            {/*      setValue(currentValue === value ? "" : currentValue);*/}
            {/*      setOpen(false);*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <HiMiniCheck*/}
            {/*      className={cn(*/}
            {/*        "mr-2 h-4 w-4",*/}
            {/*        value === framework.value ? "opacity-100" : "opacity-0",*/}
            {/*      )}*/}
            {/*    />*/}
            {/*    {framework.label}*/}
            {/*  </CommandItem>*/}
            {/*))}*/}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
