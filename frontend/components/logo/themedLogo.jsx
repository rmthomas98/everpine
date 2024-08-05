"use client";

import { Pine } from "@/components/logo/pine";
import { Qryptic } from "@/components/logo/qryptic";

export const ThemedLogo = () => {
  return (
    <div className="flex items-center space-x-2">
      <Pine />
      {/*<Qryptic />*/}
      <p className="text-[13px] font-medium">Qryptic</p>
    </div>
  );
};
