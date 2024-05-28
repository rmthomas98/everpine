"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import useScrollPosition from "@react-hook/window-scroll";

export const Compare = () => {
  return (
    <div className="py-12">
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
        className={`flex justify-between items-end pt-8 sticky top-[60px] bg-background pb-2`}
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
      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-foreground">Link management</TableHead>
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
              <TableHead className="text-foreground">QR Codes</TableHead>
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
    </div>
  );
};
