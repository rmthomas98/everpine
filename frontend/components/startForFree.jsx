"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export const StartForFree = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div></div>;

  return (
    <Card className="max-w-[1000px] mx-auto">
      <CardHeader>
        {/*<div className="flex mb-4 justify-center">*/}
        {/*  <Badge className="w-fit" variant="outline">*/}
        {/*    */}
        {/*  </Badge>*/}
        {/*</div>*/}
        <CardTitle className="text-center text-lg">
          Get connected with your audience today
        </CardTitle>
        <CardDescription className="mt-1.5 text-center">
          Start creating branded links and QR codes to engage with your audience
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button className="w-[200px]">Start for free</Button>
      </CardContent>
    </Card>
  );
};
