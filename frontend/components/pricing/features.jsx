"use client";

import { BiBarChart, BiBrain, BiGlobe, BiLinkAlt } from "react-icons/bi";
import { HiMiniQrCode } from "react-icons/hi2";
import { MdOutlineAdminPanelSettings } from "react-icons/md";

export const Features = () => {
  return (
    <div className="py-12 px-4">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-bold text-center">
          Features that will benefit your business
        </h2>
        <p className="text-muted-foreground mt-2 text-center text-sm">
          Unlock the full potential of Spacemon with our powerful features.
        </p>
        <div className="grid gap-4 grid-cols-[1fr_1fr] mt-8">
          <div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">
            <div>
              <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/65 rounded-xl flex items-center justify-center relative">
                <BiLinkAlt size={22} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                Branded short links
              </p>
              <h3 className="font-semibold leading-none tracking-tight mt-4">
                Perfect short links for your brand
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Create recognizable short links that match your brand. Link to
                your website, social media, or any other online content.
              </p>
            </div>
          </div>
          <div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">
            <div>
              <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/65 rounded-xl flex items-center justify-center relative">
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
                Create custom QR codes with your brand colors, logo, and more.
                Great for physical marketing materials.
              </p>
            </div>
          </div>
          <div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">
            <div>
              <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/65 rounded-xl flex items-center justify-center relative">
                <BiBrain size={22} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                Artificial intelligence (AI)
              </p>
              <h3 className="font-semibold leading-none tracking-tight mt-4">
                Stunning AI-powered QR codes
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Create visually captivating QR codes that spark curiosity and
                excitement in your audience.
              </p>
            </div>
          </div>
          <div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">
            <div>
              <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/65 rounded-xl flex items-center justify-center relative">
                <BiGlobe size={22} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                Landing page builder
              </p>
              <h3 className="font-semibold leading-none tracking-tight mt-4">
                Custom landing pages for your links
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Create custom landing pages for your links and QR codes to
                provide more information and drive conversions.
              </p>
            </div>
          </div>
          <div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">
            <div>
              <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/65 rounded-xl flex items-center justify-center relative">
                <BiBarChart size={22} />
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
                Monitor your links, QR codes, and pages with in-depth analytics.
                Track clicks, scans, page views, and more.
              </p>
            </div>
          </div>
          <div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">
            <div>
              <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/65 rounded-xl flex items-center justify-center relative">
                <MdOutlineAdminPanelSettings size={24} />
              </div>
            </div>
            <div>
              <p className="text-[13px] text-muted-foreground">
                Role-based access
              </p>
              <h3 className="font-semibold leading-none tracking-tight mt-4">
                Multi-user access with permissions
              </h3>
              <p className="text-sm text-muted-foreground mt-1.5">
                Collaborate with your team and manage access levels. Assign
                roles and permissions to different team members.
              </p>
            </div>
          </div>
          {/*<div className="p-6 pl-10 border shadow rounded-xl flex items-center space-x-10">*/}
          {/*  <div>*/}
          {/*    <div className="h-[54px] w-[54px] border ring-[5px] ring-accent/60 rounded-xl flex items-center justify-center relative">*/}
          {/*      <FiBox size={22} />*/}
          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div>*/}
          {/*    <p className="text-[13px] text-muted-foreground">*/}
          {/*      White label solution*/}
          {/*    </p>*/}
          {/*    <h3 className="font-semibold leading-none tracking-tight mt-4">*/}
          {/*      Showcase your brand seamlessly*/}
          {/*    </h3>*/}
          {/*    <p className="text-sm text-muted-foreground mt-1.5">*/}
          {/*      Create custom-branded short links that match your brand. Share*/}
          {/*      them anywhere and track their performance.*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
