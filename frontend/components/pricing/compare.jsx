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
    label: "Scans",
    data: ["unlimited", "unlimited", "unlimited", "unlimited"],
  },
];

export const Compare = () => {
  const [offset, setOffset] = useState(0);

  const ref = useRef(null);
  const scrollY = useScrollPosition(60);

  useEffect(() => {
    setOffset(ref.current?.offsetTop);

    return () => setOffset(0);
  }, [scrollY]);

  console.log(offset);

  return (
    <div className="py-12 max-w-[1000px] mx-auto" ref={ref}>
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
                  QR Codes
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
                  Analytics and Tracking
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-background-accent">
                <TableCell>QR Codes per month</TableCell>
                <TableCell className="text-center">2</TableCell>
                <TableCell className="text-center">10</TableCell>
                <TableCell className="text-center">50</TableCell>
                <TableCell className="text-center">200</TableCell>
              </TableRow>
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
              <TableRow className="bg-background-accent">
                <TableCell>QR Codes per month</TableCell>
                <TableCell className="text-center">2</TableCell>
                <TableCell className="text-center">10</TableCell>
                <TableCell className="text-center">50</TableCell>
                <TableCell className="text-center">200</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-base">
                  White Labeling
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-background-accent">
                <TableCell>QR Codes per month</TableCell>
                <TableCell className="text-center">2</TableCell>
                <TableCell className="text-center">10</TableCell>
                <TableCell className="text-center">50</TableCell>
                <TableCell className="text-center">200</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-base">
                  Smart Rules
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-background-accent">
                <TableCell>QR Codes per month</TableCell>
                <TableCell className="text-center">2</TableCell>
                <TableCell className="text-center">10</TableCell>
                <TableCell className="text-center">50</TableCell>
                <TableCell className="text-center">200</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-base">
                  Team Management
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-background-accent">
                <TableCell>QR Codes per month</TableCell>
                <TableCell className="text-center">2</TableCell>
                <TableCell className="text-center">10</TableCell>
                <TableCell className="text-center">50</TableCell>
                <TableCell className="text-center">200</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <div className="mt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground text-base">
                  Customer Support
                </TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[140px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-background-accent">
                <TableCell>QR Codes per month</TableCell>
                <TableCell className="text-center">2</TableCell>
                <TableCell className="text-center">10</TableCell>
                <TableCell className="text-center">50</TableCell>
                <TableCell className="text-center">200</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </TooltipProvider>
    </div>
  );
};
