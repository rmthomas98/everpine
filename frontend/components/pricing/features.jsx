"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BiBrain, BiLinkAlt } from "react-icons/bi";
import { HiMiniQrCode } from "react-icons/hi2";
import {
  FiBarChart2,
  FiBox,
  FiFilter,
  FiLock,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const Features = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-bold text-center">
          Access to powerful features
        </h2>
        <p className="text-muted-foreground mt-2 text-center text-sm">
          Unlock the full potential of Dreamist with our powerful features.
        </p>
        <div className="grid gap-4 grid-cols-[1fr_1fr] mt-8">
          <div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">
            <div>
              <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/60 rounded-xl flex items-center justify-center relative">
                <BiLinkAlt size={22} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                Custom short links
              </p>
              <h3 className="font-semibold leading-none tracking-tight mt-4">
                Create custom-branded short links
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Create custom-branded short links that match your brand. Share
                them anywhere and track their performance.
              </p>
            </div>
          </div>
          <div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">
            <div>
              <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/60 rounded-xl flex items-center justify-center relative">
                <HiMiniQrCode size={22} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                QR code generator
              </p>
              <h3 className="font-semibold leading-none tracking-tight mt-4">
                Fully customizable QR codes
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Create custom-branded short links that match your brand. Share
                them anywhere and track their performance.
              </p>
            </div>
          </div>
          <div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">
            <div>
              <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/60 rounded-xl flex items-center justify-center relative">
                <BiBrain size={22} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                Artificial intelligence (AI)
              </p>
              <h3 className="font-semibold leading-none tracking-tight mt-4">
                Create stunning QR codes with AI
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Create custom-branded short links that match your brand. Share
                them anywhere and track their performance.
              </p>
            </div>
          </div>
          <div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">
            <div>
              <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/60 rounded-xl flex items-center justify-center relative">
                <FiBarChart2 size={22} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                Detailed analytics
              </p>
              <h3 className="font-semibold leading-none tracking-tight mt-4">
                Get real-time insights and reports
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Create custom-branded short links that match your brand. Share
                them anywhere and track their performance.
              </p>
            </div>
          </div>
          <div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">
            <div>
              <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/60 rounded-xl flex items-center justify-center relative">
                <MdOutlineAdminPanelSettings size={24} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                Role-based access
              </p>
              <h3 className="font-semibold leading-none tracking-tight mt-4">
                Set permissions for your team
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Create custom-branded short links that match your brand. Share
                them anywhere and track their performance.
              </p>
            </div>
          </div>
          <div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">
            <div>
              <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/60 rounded-xl flex items-center justify-center relative">
                <FiBox size={22} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                Custom branding and domains
              </p>
              <h3 className="font-semibold leading-none tracking-tight mt-4">
                Showcase your brand seamlessly
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Create custom-branded short links that match your brand. Share
                them anywhere and track their performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
