"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import useScrollPosition from "@react-hook/window-scroll";
import {
  FiCheck,
  FiCheckCircle,
  FiInfo,
  FiMinus,
  FiX,
  FiXCircle,
} from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const links = [
  {
    label: "Shortened links",
    data: ["2/mo", "10/mo", "50/mo", "200/mo"],
    info: "The number of links you can shorten each month",
  },
  {
    label: "Branded links",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
    info: "The number of branded links you can create each month",
  },
  {
    label: "Custom paths",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "Redirects",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      "10/mo",
      "50/mo",
      "200/mo",
    ],
  },
  {
    label: "Bulk creation",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      "10/mo",
      "50/mo",
      "200/mo",
    ],
  },
  {
    label: "Link clicks",
    data: ["unlimited", "unlimited", "unlimited", "unlimited"],
  },
];

const qrCodes = [
  {
    label: "QR codes",
    data: ["2/mo", "10/mo", "50/mo", "200/mo"],
  },
  {
    label: "AI-generative QR art",
    data: [
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "AI template library",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "Redirects",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      "10/mo",
      "50/mo",
      "200/mo",
    ],
  },
  {
    label: "Custom logo",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "Custom colors",
    data: ["limited", "enhanced", "enhanced", "enhanced"],
  },
  {
    label: "Custom patterns",
    data: ["limited", "enhanced", "enhanced", "enhanced"],
  },
  {
    label: "Download formats",
    data: ["png/svg", "png/svg", "png/svg", "png/svg"],
  },
  {
    label: "Scans",
    data: ["unlimited", "unlimited", "unlimited", "unlimited"],
  },
];

const analytics = [
  {
    label: "Historical data",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      "1 month",
      "6 months",
      "1 year",
    ],
  },
  {
    label: "Real time data",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "Geolocation data",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "OS, device, browser data",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "Referrer data",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "Download data",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
];

const domains = [
  {
    label: "Custom domains",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      "unlimited",
      "unlimited",
      "unlimited",
    ],
  },
  {
    label: "Domain re-router",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
];

const series = [
  {
    label: "Series",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "UTM builder",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "UTM presets",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "Series analytics",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
];

const rules = [
  {
    label: "Password protection",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "Redirect by device",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "Redirect by day of week",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
  {
    label: "Redirect by time of day",
    data: [
      <FiX className="mx-auto text-muted-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
      <FiCheck className="mx-auto text-foreground" />,
    ],
  },
];

const team = [];
const support = [];

export const Compare = () => {
  return (
    <div className="py-12 max-w-[1000px] mx-auto">
      <div className="mx-auto mb-4 w-fit">
        <Badge variant="outline">Compare</Badge>
      </div>
      <h2 className="text-2xl font-bold text-center">
        Compare the full feature set
      </h2>
      <p className="text-muted-foreground mt-2 text-center text-sm">
        Compare all features across all plans to find the best plan for you
      </p>
      <div
        className={`flex justify-between items-end pt-8 sticky top-[60px] bg-background pb-4`}
      >
        <h3 className="text-xl font-semibold">Choose your plan:</h3>
        <div className="flex items-center">
          <div className="w-[140px] px-2">
            <p className="mb-2 text-center text-sm">Free</p>
            {/*<p className="text-center text-muted-foreground text-xs mb-2">*/}
            {/*  $0/month*/}
            {/*</p>*/}
            <Button size="sm" className="w-full">
              Select
            </Button>
          </div>
          <div className="w-[140px] px-2">
            <p className="mb-2 text-center text-sm">Professional</p>
            {/*<p className="text-center text-muted-foreground text-xs mb-2">*/}
            {/*  $0/month*/}
            {/*</p>*/}
            <Button size="sm" className="w-full">
              Select
            </Button>
          </div>
          <div className="w-[140px] px-2">
            <p className="mb-2 text-center text-sm">Business</p>
            {/*<p className="text-center text-muted-foreground text-xs mb-2">*/}
            {/*  $0/month*/}
            {/*</p>*/}
            <Button size="sm" className="w-full">
              Select
            </Button>
          </div>
          <div className="w-[140px] px-2">
            <p className="mb-2 text-center text-sm">Enterprise</p>
            {/*<p className="text-center text-muted-foreground text-xs mb-2">*/}
            {/*  $0/month*/}
            {/*</p>*/}
            <Button size="sm" className="w-full">
              Select
            </Button>
          </div>
        </div>
      </div>
      <TooltipProvider delayDuration={0}>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-base bg-accent-background">
                  Link management
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="items-center flex">
                    <span className="mr-1.5">{item.label}</span>
                    <Tooltip>
                      <TooltipTrigger className="cursor-auto">
                        <FiInfo size={15} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent withArrow side="right" sideOffset={10}>
                        {item.info}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  {item.data.map((data, index) => (
                    <TableCell key={index} className="text-center">
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-base">
                  QR codes
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {qrCodes.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="items-center flex">
                    <span className="mr-1.5">{item.label}</span>
                    <Tooltip>
                      <TooltipTrigger className="cursor-auto">
                        <FiInfo size={15} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent withArrow side="right" sideOffset={10}>
                        {item.info}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  {item.data.map((data, index) => (
                    <TableCell key={index} className="text-center">
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-base">
                  Analytics and tracking
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="items-center flex">
                    <span className="mr-1.5">{item.label}</span>
                    <Tooltip>
                      <TooltipTrigger className="cursor-auto">
                        <FiInfo size={15} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent withArrow side="right" sideOffset={10}>
                        {item.info}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  {item.data.map((data, index) => (
                    <TableCell key={index} className="text-center">
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-base">
                  Series
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {series.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="items-center flex">
                    <span className="mr-1.5">{item.label}</span>
                    <Tooltip>
                      <TooltipTrigger className="cursor-auto">
                        <FiInfo size={15} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent withArrow side="right" sideOffset={10}>
                        {item.info}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  {item.data.map((data, index) => (
                    <TableCell key={index} className="text-center">
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-base">
                  Custom branding
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {domains.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="items-center flex">
                    <span className="mr-1.5">{item.label}</span>
                    <Tooltip>
                      <TooltipTrigger className="cursor-auto">
                        <FiInfo size={15} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent withArrow side="right" sideOffset={10}>
                        {item.info}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  {item.data.map((data, index) => (
                    <TableCell key={index} className="text-center">
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-base">
                  Smart rules
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="items-center flex">
                    <span className="mr-1.5">{item.label}</span>
                    <Tooltip>
                      <TooltipTrigger className="cursor-auto">
                        <FiInfo size={15} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent withArrow side="right" sideOffset={10}>
                        {item.info}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  {item.data.map((data, index) => (
                    <TableCell key={index} className="text-center">
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-base">
                  Team management
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="items-center flex">
                    <span className="mr-1.5">{item.label}</span>
                    <Tooltip>
                      <TooltipTrigger className="cursor-auto">
                        <FiInfo size={15} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent withArrow side="right" sideOffset={10}>
                        {item.info}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  {item.data.map((data, index) => (
                    <TableCell key={index} className="text-center">
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-base">
                  Customer support
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {support.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="items-center flex">
                    <span className="mr-1.5">{item.label}</span>
                    <Tooltip>
                      <TooltipTrigger className="cursor-auto">
                        <FiInfo size={15} className="text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent withArrow side="right" sideOffset={10}>
                        {item.info}
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>
                  {item.data.map((data, index) => (
                    <TableCell key={index} className="text-center">
                      {data}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TooltipProvider>
    </div>
  );
};
