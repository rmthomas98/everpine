"use client";

import { Pine } from "@/components/logo/pine";

export const ThemedLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Pine />
      <p className="text-base font-semibold">everpine</p>
    </div>
  );
};
