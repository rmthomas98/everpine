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
        <div
          className={`p-[1.5px] bg-gradient-to-tr from-fuchsia-600 to-violet-600 rounded-[8px]`}
        >
          <Button className="w-[200px] bg-background text-foreground hover:bg-transparent">
            Start for free
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
