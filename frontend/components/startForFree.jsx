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
    // <Card className="max-w-[1000px] mx-auto">
    //   <CardHeader>
    //     {/*<div className="flex mb-4 justify-center">*/}
    //     {/*  <Badge className="w-fit" variant="outline">*/}
    //     {/*    */}
    //     {/*  </Badge>*/}
    //     {/*</div>*/}
    //     <CardTitle className="text-center text-lg">
    //       Get connected with your audience today
    //     </CardTitle>
    //     <CardDescription className="mt-1.5 text-center">
    //       Start creating branded links and QR codes to engage with your audience
    //     </CardDescription>
    //   </CardHeader>
    //   <CardContent className="flex justify-center">
    //     <div
    //       className={`p-[1.5px] bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 background-animate rounded-[8px]`}
    //     >
    //       <Button
    //         className={`w-[200px] bg-background/90 hover:bg-transparent text-foreground ${
    //           resolvedTheme === "light" && "hover:text-background"
    //         }`}
    //       >
    //         Start for free
    //       </Button>
    //     </div>
    //   </CardContent>
    // </Card>
    <div className="flex justify-between items-center max-w-[1000px] mx-auto py-12">
      <div>
        <h2 className="text-2xl font-bold">Generate. Engage. Grow.</h2>
        <p className="text-muted-foreground mt-2 text-sm max-w-[500px]">
          Dreamist is the all-in-one platform to unleash the power of your
          custom links and QR codes with AI. Get started for free today.
        </p>
      </div>
      <div className="space-y-3 flex flex-col items-center">
        <div
          className={`p-[1.5px] bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 background-animate rounded-[8px] w-fit`}
        >
          <Button
            className={`bg-background/90 hover:bg-transparent text-foreground w-[200px] ${
              resolvedTheme === "light" && "hover:text-background"
            }`}
          >
            Start for free
          </Button>
        </div>
        <Button className="w-[200px]" variant="secondary">
          Contact sales
        </Button>
      </div>
    </div>
  );
};
