"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  FiBarChart2,
  FiBox,
  FiFlag,
  FiFolder,
  FiGlobe,
  FiInfo,
  FiMessageCircle,
  FiShield,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useInView } from "react-intersection-observer";
import {
  HiMiniCheckCircle,
  HiMiniQrCode,
  HiMiniXCircle,
} from "react-icons/hi2";
import { BiBarChart, BiGlobe, BiLinkAlt, BiFolder } from "react-icons/bi";

const links = [
  {
    label: "Shortened links",
    data: ["15/mo", "400/mo", "2,000/mo", "10,000/mo"],
    info: "The number of links you can shorten each month",
  },
  {
    label: "Redirects",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      "100/mo",
      "500/mo",
      "2,500/mo",
    ],
  },
  {
    label: "Branded links",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
    info: "The number of branded links you can create each month",
  },
  {
    label: "Custom paths",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Bulk creation",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      "400/mo",
      "2,000/mo",
      "10,000/mo",
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
    data: ["3/mo", "20/mo", "100/mo", "500/mo"],
  },
  {
    label: "Redirects",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      "5/mo",
      "25/mo",
      "125/mo",
    ],
  },
  {
    label: "AI generative QR art",
    data: [
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  // {
  //   label: "AI template library",
  //   data: [
  //     <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
  //     <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
  //     <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
  //     <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
  //   ],
  // },
  {
    label: "Custom logo",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
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

const pages = [
  {
    label: "Custom pages",
    data: ["1", "3", "10", "50"],
  },
  {
    label: "Custom branding",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Themes and templates",
    data: ["limited", "enhanced", "enhanced", "enhanced"],
  },
];

const analytics = [
  {
    label: "Historical data",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      "3 months",
      "1 year",
      "3 years",
    ],
  },
  {
    label: "Real time data",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Clicks, scans, page view data",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Geolocation data",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "OS, device, browser data",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Referrer data",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Download data",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
];

const domains = [
  {
    label: "Custom domains",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      "1",
      "3",
      "10",
    ],
  },
  {
    label: "Domain re-router",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
];

const series = [
  {
    label: "Campaigns",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "UTM builder",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "UTM presets",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Campaign analytics",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
];

const rules = [
  {
    label: "Password protection",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Redirect by device",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Redirect by day of week",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Redirect by time of day",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
];

const team = [
  {
    label: "Platform seats",
    data: ["1", "5", "15", "50"],
  },
  {
    label: "Roles and permissions",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Admin privileges",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
];

const support = [
  {
    label: "Email support",
    data: [
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Priority support",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Dedicated support manager",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
];

const security = [
  {
    label: "Multi-factor authentication (MFA)",
    data: [
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
  {
    label: "Single sign-on (SSO)",
    data: [
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniXCircle className="mx-auto text-muted-foreground/50" size={20} />,
      <HiMiniCheckCircle className="mx-auto text-foreground" size={20} />,
    ],
  },
];

export const Compare = () => {
  const { ref, inView } = useInView({});

  return (
    <div className="py-12">
      <div>
        {/*<div className="mx-auto mb-4 w-fit">*/}
        {/*  <Badge variant="outline">Compare</Badge>*/}
        {/*</div>*/}
        <h2 className="text-2xl font-bold text-center" ref={ref}>
          Compare the full feature set
        </h2>
        <p className="text-muted-foreground mt-2 text-center text-sm">
          Compare all features across all plans to find the best plan for you
        </p>
        <div className={`border-b px-4 h-full sticky top-[60px]`}>
          <div
            className={`flex justify-between items-end pt-8 bg-background pb-4 max-w-[1000px] mx-auto`}
          >
            <h3
              className={`text-xl font-semibold ${
                !inView && "opacity-0 pointer-events-none"
              } transition-all`}
            >
              Choose your plan:
            </h3>
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
        </div>
        <div className="px-4">
          <div className="max-w-[1000px] mx-auto">
            <TooltipProvider delayDuration={0}>
              <div className="mt-8">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-foreground text-base sticky top-[120px]">
                        <div className="flex items-center space-x-2">
                          <BiLinkAlt />
                          <span>Custom links</span>
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border-b">
                    {links.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="items-center flex border-r py-4">
                          <span className="mr-1.5">{item.label}</span>
                          <Tooltip>
                            <TooltipTrigger className="cursor-auto">
                              <FiInfo
                                size={15}
                                className="text-muted-foreground"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={10}>
                              {item.info}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        {item.data.map((data, index) => (
                          <TableCell
                            key={index}
                            className={`text-center text-muted-foreground ${
                              index !== 3 && "border-r"
                            } py-4`}
                          >
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
                      <TableHead className="text-foreground text-base sticky top-[120px]">
                        <div className="flex items-center space-x-2">
                          <HiMiniQrCode />
                          <span>QR codes</span>
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border-b">
                    {qrCodes.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="items-center flex py-4 border-r">
                          <span className="mr-1.5">{item.label}</span>
                          <Tooltip>
                            <TooltipTrigger className="cursor-auto">
                              <FiInfo
                                size={15}
                                className="text-muted-foreground"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={10}>
                              {item.info}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        {item.data.map((data, index) => (
                          <TableCell
                            key={index}
                            className={`text-center text-muted-foreground py-4 ${
                              index !== 3 && "border-r"
                            }`}
                          >
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
                      <TableHead className="text-foreground text-base sticky top-[120px]">
                        <div className="flex items-center space-x-2">
                          <BiGlobe />
                          <span>Landing pages</span>
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border-b">
                    {pages.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="items-center flex py-4 border-r">
                          <span className="mr-1.5">{item.label}</span>
                          <Tooltip>
                            <TooltipTrigger className="cursor-auto">
                              <FiInfo
                                size={15}
                                className="text-muted-foreground"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={10}>
                              {item.info}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        {item.data.map((data, index) => (
                          <TableCell
                            key={index}
                            className={`text-center text-muted-foreground py-4 ${
                              index !== 3 && "border-r"
                            }`}
                          >
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
                      <TableHead className="text-foreground text-base sticky top-[120px]">
                        <div className="flex items-center space-x-2">
                          <BiBarChart />
                          <span>Analytics and tracking</span>
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border-b">
                    {analytics.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="items-center flex py-4 border-r">
                          <span className="mr-1.5">{item.label}</span>
                          <Tooltip>
                            <TooltipTrigger className="cursor-auto">
                              <FiInfo
                                size={15}
                                className="text-muted-foreground"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={10}>
                              {item.info}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        {item.data.map((data, index) => (
                          <TableCell
                            key={index}
                            className={`text-center py-4 ${
                              index !== 3 && "border-r"
                            }`}
                          >
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
                      <TableHead className="text-foreground text-base sticky top-[120px]">
                        <div className="flex items-center space-x-2">
                          <BiFolder />
                          <span>Campaigns</span>
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border-b">
                    {series.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="items-center flex py-4 border-r">
                          <span className="mr-1.5">{item.label}</span>
                          <Tooltip>
                            <TooltipTrigger className="cursor-auto">
                              <FiInfo
                                size={15}
                                className="text-muted-foreground"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={10}>
                              {item.info}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        {item.data.map((data, index) => (
                          <TableCell
                            key={index}
                            className={`text-center ${
                              index !== 3 && "border-r"
                            }`}
                          >
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
                      <TableHead className="text-foreground text-base sticky top-[120px]">
                        <div className="flex items-center space-x-2">
                          <FiBox />
                          <span>White label</span>
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border-b">
                    {domains.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="items-center flex p-4 border-r">
                          <span className="mr-1.5">{item.label}</span>
                          <Tooltip>
                            <TooltipTrigger className="cursor-auto">
                              <FiInfo
                                size={15}
                                className="text-muted-foreground"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={10}>
                              {item.info}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        {item.data.map((data, index) => (
                          <TableCell
                            key={index}
                            className={`text-center ${
                              index !== 3 && "border-r"
                            }`}
                          >
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
                      <TableHead className="text-foreground text-base sticky top-[120px]">
                        <div className="flex items-center space-x-2">
                          <FiFlag />
                          <span>Smart rules</span>
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border-b">
                    {rules.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="items-center flex py-4 border-r">
                          <span className="mr-1.5">{item.label}</span>
                          <Tooltip>
                            <TooltipTrigger className="cursor-auto">
                              <FiInfo
                                size={15}
                                className="text-muted-foreground"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={10}>
                              {item.info}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        {item.data.map((data, index) => (
                          <TableCell
                            key={index}
                            className={`text-center ${
                              index !== 3 && "border-r"
                            }`}
                          >
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
                      <TableHead className="text-foreground text-base sticky top-[120px]">
                        <div className="flex items-center space-x-2">
                          <FiUsers />
                          <span>Team management</span>
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border-b">
                    {team.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="items-center flex py-4 border-r">
                          <span className="mr-1.5">{item.label}</span>
                          <Tooltip>
                            <TooltipTrigger className="cursor-auto">
                              <FiInfo
                                size={15}
                                className="text-muted-foreground"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={10}>
                              {item.info}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        {item.data.map((data, index) => (
                          <TableCell
                            key={index}
                            className={`text-center py-4 ${
                              index !== 3 && "border-r"
                            }`}
                          >
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
                      <TableHead className="text-foreground text-base sticky top-[120px]">
                        <div className="flex items-center space-x-2">
                          <FiShield />
                          <span>Security</span>
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border-b">
                    {security.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="items-center flex py-4 border-r">
                          <span className="mr-1.5">{item.label}</span>
                          <Tooltip>
                            <TooltipTrigger className="cursor-auto">
                              <FiInfo
                                size={15}
                                className="text-muted-foreground"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={10}>
                              {item.info}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        {item.data.map((data, index) => (
                          <TableCell
                            key={index}
                            className={`text-center py-4 ${
                              index !== 3 && "border-r"
                            }`}
                          >
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
                      <TableHead className="text-foreground text-base sticky top-[120px]">
                        <div className="flex items-center space-x-2">
                          <FiMessageCircle />
                          <span>Customer support</span>
                        </div>
                      </TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="border-b">
                    {support.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="items-center flex py-4 border-r">
                          <span className="mr-1.5">{item.label}</span>
                          <Tooltip>
                            <TooltipTrigger className="cursor-auto">
                              <FiInfo
                                size={15}
                                className="text-muted-foreground"
                              />
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={10}>
                              {item.info}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                        {item.data.map((data, index) => (
                          <TableCell
                            key={index}
                            className={`text-center py-4 ${
                              index !== 3 && "border-r"
                            }`}
                          >
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
        </div>
      </div>
    </div>
  );
};
